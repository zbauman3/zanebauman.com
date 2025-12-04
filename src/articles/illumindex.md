<!--
title: Illumindex
description: An exploration of display drivers and IoT systems, from scratch.
active: false
slug: illumindex
tags: esp32, esp32-s2, Espressif, 3D-printing, graphics, highlight, Node.js, iot
date: 11/29/2025
lastModified: 11/29/2025
image: /assets/illumindex/cover.png
-->

<!--
TODO:
- Why I didn't use MQTT
-
-->

## About

This project started as a simple idea: I wanted a small display on my desk that could show bits of information throughout the day. There are already a ton of these informational displays on the market, but if I’m being honest, actually having the display was never as interesting to me as building it. I’d always wondered how LED matrix displays worked, and combining one with networking sounded like a great excuse to also explore IoT development.

Thus "Illumindex" was born, short for "Illuminated Information Index" (yes, the second "i" stands for information, not index). It is not a great name, but I am terrible at naming things, and that is not really the point of this project anyway.

The hardware for this project is incredibly minimal, so this post will focus mostly on the software. I will be diving very deep into many different aspects of the code, and hopefully you will learn something interesting along the way. At the very least, each section begins with a high-level overview, so even skimming the article should be somewhat interesting.

### Architectural Overview

Since this was my first exploration into the world of IoT, I wanted to focus heavily on the embedded side of the project. Specifically, I wanted hands-on experience writing a decently robust network stack for the firmware. This included everything from establishing a WiFi connection, handling reconnections, and syncing with NTP servers, to wrapping low-level HTTP requests with a higher-level "fetch" abstraction for working with JSON REST endpoints. Luckily, ESP-IDF provides a vast library of APIs that handle most of the extremely low-level networking details (alas, I did not write my own TCP/IP stack).

Outside of the network stack, I also wanted to build the display driver and a small set of utilities for working with bitmap graphics, including custom ASCII fonts, simple shapes, and graphs. But I didn’t want to base these on code I had seen elsewhere or simply copy other solutions. I wanted to genuinely learn the challenges of these systems and write the implementations according to my own understanding and capabilities.

That is not to say I avoided other libraries or articles. All of the code here is my own, but I gained a huge amount of insight and direction from open-source projects and technical articles, many of which were incredibly helpful in guiding me through difficult problems. I will discuss these sources in their relevant sections below.

For the cloud backend, I went with what I know well from work. The backend is written in TypeScript/Node.js and hosted on one of [Vercel’s hobby plans](https://vercel.com/pricing). For simplicity of maintenance, speed of execution, and cost, Vercel made the most sense to me. I initially planned to use Next.js as a quick way to deliver simple Node.js logic to [Lambda functions](https://aws.amazon.com/lambda/), but I eventually added some UI development utilities to the application that can also be accessed via the local development server.

### AI/LLM Involvement

It’s the end of 2025 at the time of writing. LLMs are everywhere and anyone in the tech industry is aware that they're nearly inescapable at this point. Endless discussions are being had about the future of software engineering and how LLMs fit into it – or maybe, how humans fit into it. I don’t believe this article is the place for me to brain dump my opinions. However, I will say that I am especially concerned with patterns we are beginning to see. More and more engineers use LLMs to achieve a goal, but then move on without taking time to learn from the problems that they have just solved.

I believe that growth in _engineering fundamentals_ is a journey that never ends, and outsourcing thought and understanding to LLMs will have deep, negative impacts on engineers in the long run. Less human involvement in software engineering may be the future, and that's okay. But for now, I _like_ software engineering and deeply value the growth that comes from understanding a problem and designing a solution.

This project was written without _any_ LLM "agent" involvement. It _was_ written with LLM autocomplete "suggestions". To me, this is the perfect symbiosis between LLMs and software engineering. It allows me to drive the line-by-line architecture of the system, encounter problems, explore solutions, choose the directions of the software, and maintain a deep understanding of the system, while at the same time speeding up development and reducing physical fatigue.

This article, however, has been significantly reviewed and edited by an LLM. I've written all initial versions, but I've also passed the output to an LLM for corrections and consistency.

## Software

> The software is open source and available at [github.com/zbauman3/illumindex](https://github.com/zbauman3/illumindex).

While the firmware was built using Espressif's [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/v5.3.1/esp32s3) (through their wonderful [ESP-IDF Extension for VSCode](https://docs.espressif.com/projects/vscode-esp-idf-extension/)), there were no other dependencies in this project outside of the standard library that the the ESP-IDF provides. Since this was a learning experience, rather than a project with a deadline, I wanted to make sure that I was involved in writing all of the application logic.

I broke down the individual pieces of the firmware into logical sections, depending on their purpose. The ESP-IDF has a concept for this called [Components](https://docs.espressif.com/projects/esp-idf/en/v5.3.1/esp32s3/api-guides/build-system.html#concepts). These components are: [led_matrix](), [network](), [gfx](), [commands](), [display](), [state](), and [time_util]().

I'll talk about each of these components in detail below.

```mermaid
flowchart TD
  main(main)
  display(display)
  wifi(network/wifi)
  fetch(network/fetch)
  font(gfx/font)
  display_buffer(gfx/display_buffer)
  commands(commands)
  state(state)
  led_matrix(led_matrix)
  time_util(time_util)

  main --> time_util
  main --> display
  main --> wifi
  main --> state

  display --> time_util
  display --> commands
  display --> led_matrix
  display --> state
  display --> display_buffer
  display --> fetch

  wifi --> state

  commands --> time_util
  commands --> font
  commands --> display_buffer

  state --> fetch

  classDef customBlock fill:#CCCCCC,color:black
  class main customBlock;
  class display customBlock;
  class wifi customBlock;
  class fetch customBlock;
  class font customBlock;
  class display_buffer customBlock;
  class commands customBlock;
  class state customBlock;
  class led_matrix customBlock;
  class time_util customBlock;
```

<br />

### led_matrix

```mermaid
flowchart LR
  matrix@{ shape: rect, label: "\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;64x64\nLED\nMatrix\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;\n&nbsp;" }

  red1@{ shape: text }    o--o matrix
  blue1@{ shape: text }   o--o matrix
  red2@{ shape: text }    o--o matrix
  blue2@{ shape: text }   o--o matrix
  A0@{ shape: text }      o--o matrix
  A2@{ shape: text }      o--o matrix
  Clock@{ shape: text }   o--o matrix
  Enabled@{ shape: text } o--o matrix

  matrix o--o green1@{ shape: text }
  matrix o--o gnd1@{ shape: text, label: "GND" }
  matrix o--o green2@{ shape: text }
  matrix o--o A4@{ shape: text }
  matrix o--o A1@{ shape: text }
  matrix o--o A3@{ shape: text }
  matrix o--o Latch@{ shape: text }
  matrix o--o gnd2@{ shape: text, label: "GND" }

  style matrix fill:#CCCCCC,color:black

  style red1 color:red
  style red2 color:red
  linkStyle 0 stroke:red
  linkStyle 2 stroke:red

  style green1 color:green
  style green2 color:green
  linkStyle 8 stroke:green
  linkStyle 10 stroke:green

  style blue1 color:#7777FF
  style blue2 color:#7777FF
  linkStyle 1 stroke:#7777FF
  linkStyle 3 stroke:#7777FF

  style A0 color:#C06000
  style A1 color:#C06000
  style A2 color:#C06000
  style A3 color:#C06000
  style A4 color:#C06000
  linkStyle 4 stroke:#D35900
  linkStyle 5 stroke:#D35900
  linkStyle 11 stroke:#D35900
  linkStyle 12 stroke:#D35900
  linkStyle 13 stroke:#D35900

  style Clock color:#99A000
  style Enabled color:#99A000
  style Latch color:#99A000
  linkStyle 6 stroke:#99A000
  linkStyle 7 stroke:#99A000
  linkStyle 14 stroke:#99A000
```

- Dedicated GPIO
  - https://docs.espressif.com/projects/esp-idf/en/stable/esp32s2/api-reference/peripherals/dedic_gpio.html#manipulate-gpios-by-writing-assembly-code
- https://bikerglen.com/projects/lighting/led-panel-1up/

### network

#### WiFi

#### Fetch

### gfx

#### Display Buffer

#### Fonts

- Bitmap Fonts: http://www.piclist.com/tecHREF/datafile/charset/extractor/charset_extractor.htm
  - https://bitmap-code-generator.benalman.com/

### commands

### display

### state

### time_util

<div data-component="GithubEmbed" data-url="https://github.com/zbauman3/illumindex/blob/main/server/src/components/Bitmap.tsx#L1-L2"></div>

<br />

## Hardware

The hardware for this project is nothing special. The MCU is an ESP32-S3 development board, connected to a 64x64 RGB LED Matrix panel. It is powered with a 5V 4A switching power supply. I also added a switch to toggle the MCU's power source between the USB port and the power supply, since there are no protection diodes for the USB port on the development board I used.

### Parts List

| Part                                                                                   | Description                                     |
| -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Adafruit ESP32-S3 Feather](https://www.adafruit.com/product/5477)                     | The main MCU                                    |
| [64x64 RGB LED matrix panel](https://www.adafruit.com/product/5362)                    | The LED matrix panel                            |
| [5V 4A (4000mA) switching power supply](https://www.adafruit.com/product/1466)         | Power supply                                    |
| [2x8 IDC breakout pins](https://www.adafruit.com/product/2104)                         | Connection pins for the ribbon cable            |
| [2x8 IDC ribbon cable](https://www.adafruit.com/product/4170)                          | Connection between the MCU and the LED matrix   |
| [Black LED diffusion acrylic](https://www.adafruit.com/product/4594)                   | Makes the LEDs less harsh and easier to look at |
| [Adafruit Perma-Proto Half-sized Breadboard PCB](https://www.adafruit.com/product/571) | The board that everything is soldered to        |

<br />

## Media

<div data-component="MediaCollage" class="mb-6">
  <img src="/assets/illumindex/back-open-full.png" alt="The board slides into grooves in the body og the display" />
  <img src="/assets/illumindex/back-open.png" alt="Here is the exposed back of the panel" />
  <img src="/assets/illumindex/board-front.png" alt="The board itself if very simple. Just the MCU and pins" />
  <img src="/assets/illumindex/board-back.png" alt="The back of the board showing connections between the MCU and pins" />
  <img src="/assets/illumindex/back-closed.png" alt="the back is help on with four screws" />
  <img src="/assets/illumindex/front-off.png" />
  <img src="/assets/illumindex/front-starting.png" alt="While connecting, this is the 'starting' screen that is shown" />
  <img src="/assets/illumindex/front-display.png" alt="Here the display shows the time, precipitation, 24 hour graph, and a bitmap image of the current weather (moon, clouds, and snow)" />
  <img src="/assets/illumindex/on-desk.png" alt="The Illumindex in its natural habitat, on my desk" />
</div>

## Downloads

### 3D Models

The body was printed with PETG. If I were to improve this design a little, I would have made it easier to plug in the USB cord without needing to disassemble the body.

- [Illumindex.step](https://github.com/zbauman3/illumindex/blob/main/hardware/Illumindex.step)

### Schematics

The schematic was designed with KiCad.

- [illumindex.kicad_sch](https://github.com/zbauman3/illumindex/blob/main/hardware/illumindex.kicad_sch)

<img src="/assets/illumindex/schema.png" style="width: 100%; max-width: 400px;" />
