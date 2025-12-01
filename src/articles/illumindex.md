<!--
title: Illumindex
description: An exploration of display drivers and IoT systems, from scratch.
active: false
slug: illumindex
tags: esp32, esp32-s2, Espressif, 3D-printing, graphics, highlight, Node.js
date: 11/29/2025
lastModified: 11/29/2025
image: /assets/illumindex/tmp.jpg
-->

<!--
TODO:
- Why I didn't use MQTT
-
-->

## About

#### Architectural Overview

Since this was my first exploration into the world of IoT, I wanted to focus heavily on the embedded side of the project. Specifically, I wanted to get a hands-on experiences of writing a decently robust network stack for the firmware. Everything from establishing a WiFi connection, reconnection, and syncing with NTP servers, to wrapping the low-level HTTP requests with a higher-level “fetch” abstraction for use with JSON REST endpoints. Luckily, the ESP-IDF maintains a vast library of APIs that handle most of the extremely low-level parts of networking (alas, I didn’t write my own TCP/IP stack).

Outside of the network stack, I also wanted to build the display driver and a small set of utilities for working with bit-mapped graphics; including custom ASCII fonts, simple shapes, and graphs. But I didn’t just want to build these based on code that I’ve seen or copy others’ solutions. I wanted to genuinely learn the challenges of these systems, and write the solutions according to my own understanding and capabilities.

That’s not to say I didn’t read implementations from other libraries or articles. All of the code I've written here is my own, but I gained huge amounts of insight and direction from articles and open-source libraries, whose implementations were incredibly useful in guiding me through difficult problems. I’ll discuss these sources in each of their relevant sections below.

For the cloud backend, I went with what I know well from work. The backend is written in Typescript/Node.js and hosted on one of [Vercel’s hobby plans](https://vercel.com/pricing). For simplicity of maintenance, speed of execution, and for pricing, Vercel just made sense to me. I initially was planning to use Next.js as a quick method of delivering simple Node.js logic to [Lambda functions](https://aws.amazon.com/lambda/), but I did eventually add some nice development utilities to the application that can also be accessed via the local development server.

#### AI/LLM Involvement

It’s the end of 2025 at the time of writing. LLMs are everywhere and anyone in the tech industry is aware that they're nearly inescapable at this point. Endless discussions are being had about the future of software engineering, and how LLMs fit into it – or maybe, how humans fit into it. I don’t believe this article is the place for a deep discussion on this subject. But I’ll say that I am especially concerned with patterns we are beginning to see where engineers use LLMs to achieve a goal, but then move on without taking time to learn from the problems that they have just solved. I believe that growth in engineering fundamentals is a journey that never ends, and outsourcing thought and understanding to LLMs will have deep, negative impacts to engineers in the long run.

Less human involvement in software engineering may be the future, and that's okay. But for now, I _like_ software engineering and deeply value the growth that comes from understanding a problem and designing a solution.

This project was written without _any_ LLM “agent” involvement. It _was_ written with LLM auto-complete assistance. To me, this is the perfect application and symbiosis of LLMs and software engineering. It allows me to drive the line-by-line architecture of the system, encounter problems, explore solutions, choose the directions of the software, and maintain a deep understanding of the system, while at the same time reducing the amount of keystrokes required.

This article, however, has been significantly reviewed and edited by an LLM. I've written all initial versions, but I've also passed the output to an LLM for corrections and consistency.

### Hardware

### Software

This project was built entirely from scratch, using Espressif's [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/v5.3.1/esp32s3) through their wonderful [ESP-IDF Extension for VSCode](https://docs.espressif.com/projects/vscode-esp-idf-extension/).

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

  <!-- classDef activeNodes fill:#00F
  class main activeNodes; -->
```

<br />

<div data-component="GithubEmbed" data-url="https://github.com/zbauman3/illumindex/blob/main/server/src/components/Bitmap.tsx#L1-L2"></div>

<br />

## Media

## Parts List

### Electronics

| Part | Description | Count | Link |
| ---- | ----------- | ----- | ---- |
| -    | -           | -     | -    |

## Downloads

### 3D Models

- ...

### Schematics

The schematic was designed with KiCad.

- ...
