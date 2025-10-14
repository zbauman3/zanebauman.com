<!--
title: Wattson Heirloom
description: A project to build a 3D-printed "Telemetry Receiver Module" for the Apex Legends character "Wattson".
active: true
slug: wattson-heirloom
tags: arduino, esp32, esp32-s2, Espressif, 3D-printing, graphics, highlight
date: 03/15/2024
lastModified: 10/14/2025
image: /assets/wattson-heirloom/media/cover.jpeg
-->

## About

Wattson is a character from the video game [Apex Legends](https://en.wikipedia.org/wiki/Apex_Legends). This project started as a simple idea: build a working version of her [Heirloom](https://apexlegends.fandom.com/wiki/Heirloom) for my nephew’s birthday. I didn’t want just a prop that looked right — I wanted it to work. It needed to light up, vibrate, and display data.

### Hardware

For the MCU, I chose an [Adafruit QT Py ESP32-S2](https://www.adafruit.com/product/5325), mostly because it was small, fast, and I already had one. I wanted something capable of driving an LCD, controlling LEDs, animating NeoPixels, and handling a few sensors without overloading the CPU. It ended up being a solid choice, but if I were to do it again, I’d pick a dev board with more exposed GPIO pins. That would’ve made wiring a lot simpler and saved me from needing a GPIO expander.

Because of the limited pins, I used an [MCP23017 I2C GPIO expander](https://www.adafruit.com/product/732). Between that and the [rotary encoder on an I2C breakout](https://www.adafruit.com/product/4991), I ended up juggling multiple interrupt lines that didn’t play nicely together. My first attempt was to tie both interrupt lines together into one wire. However, the expander’s line is open-drain and pulled high, while the encoder’s was actively driven – so they didn't actually work together. After a lot of debugging, I gave up and gave each device its own interrupt line.

The joystick was another unexpected headache. The analog readings weren’t stable, and the stick drifted badly around its resting point. To fix that, I added a small dead zone around the middle, averaged multiple samples for each reading, and only sampled frequently when the stick moved outside that zone. That combination made the controls feel smooth and reduced wasted CPU time from constantly reading.

For haptics, I wired a small vibration motor through a BJT so it could draw power from the 5V rail. The vibration added a ton of reality to the device, _feeling_ the feedback in your hand just really tricks the brain.

The light rods are made up of NeoPixels, with each strip wired in parallel. That means the MCU can control the same pixel index across all strips simultaneously, but not individual strips separately.

### Software

When I started the project, I wasn’t very familiar with RTOS and didn’t want to over complicate things — especially since I was on a deadline for my nephew’s birthday. So I stuck with [PlatformIO](https://platformio.org/), the Arduino framework, and used a lightweight coroutine library ([AceRoutine](https://github.com/bxparks/AceRoutine)) for cooperative multitasking. It turned out to be a great learning experience. I had to think carefully about how long each coroutine ran before yielding, because if one coroutine hogged the CPU, the rest would starve. It forced me to write efficient, predictable code.

I wasn’t sure what architecture to use at first, but since I knew I’d be building a UI, I modeled it loosely after an MVC pattern. The inputs (joystick, trigger, buttons, and encoder) act as controllers. The overall system state is the model. And everything that outputs feedback (the LCD, LEDs, and vibration) are the views. It’s a structure that felt natural coming from web development, and it made adding new features much easier later on.

The UI itself is a small menu-driven system. The rotary encoder or arrow buttons navigate rectangular “buttons” drawn on the LCD. I built a base screen class that each screen could extend to define its own layout and behavior. It’s a simple system, but surprisingly flexible — each page can override how inputs behave without touching the rest of the logic.

For the radar screen, I used the wonderful [Adafruit GFX Library](https://github.com/adafruit/Adafruit-GFX-Library), which gives you low-level primitives like lines, circles, rectangles, and text. That allowed me to dray a radar display with three “pings” moving across it. Each ping travels from one random point to another, animating at a random speed. When a ping enters the center circle, the device’s red status light starts blinking. The light rods also pulse in sync with the radar sweep.

### 3D Modeling

The 3D modeling ended up being the hardest part of the whole build. I couldn’t find any game-accurate models that fit what I needed, so I modeled everything from scratch — the case, light rods, hinges, buttons, handle, trigger, trim, clamps, etc.

The first challenge was fitting all the hardware into a reasonable form factor without making it comically large. Once I had that figured out, I had to design a mechanism for the light rods to collapse and expand — and stay put in either position. I went with a 45-degree rotating joint held in place with embedded magnets (see the video below). The wires run cleanly through the inside of the joint, and the magnets lock it into place when folded or extended. That mechanism alone took around a dozen test prints to perfect.

## Media

<video controls class="inline-block w-full md:w-[49%] mb-6" poster="/assets/wattson-heirloom/media/videos/radar-screen-poster.jpg" alt="The radar screen uses up to 3 dots at once. Each dot generates a random to/from path that it travels at a variable speed. When a dot is within the inner circle, the red light blinks.">
  <source src="/assets/wattson-heirloom/media/videos/radar-screen.mp4">
</video>
<video controls class="inline-block w-full md:w-[49%] mb-6" poster="/assets/wattson-heirloom/media/videos/rainbow-lights-poster.jpg" alt="One of the light modes is a rainbow">
  <source src="/assets/wattson-heirloom/media/videos/rainbow-lights.mp4">
</video>
<video controls class="inline-block w-full md:w-[49%] mb-6" poster="/assets/wattson-heirloom/media/videos/trigger-poster.jpg" alt="Pressing trigger causes a pulse and flash, with the vibration motor pulsing in sync. Holding the trigger causes the lights to charge up, then generate a larger pulsing and flash when released – again with the vibration motor activating in sync.">
  <source src="/assets/wattson-heirloom/media/videos/trigger.mp4">
</video>
<video controls class="inline-block w-full md:w-[49%] mb-6" poster="/assets/wattson-heirloom/media/videos/light-rods-poster.jpg" alt="The light rod joints were one of the trickier parts to design. The NeoPixels are wired in parallel, so each row needs to connect in the joint section.">
  <source src="/assets/wattson-heirloom/media/videos/light-rods.mp4">
</video>

<div data-component="MediaCollage" class="mb-6">
  <img src="/assets/wattson-heirloom/media/angles/Side-Back.jpeg" alt="Side back view" />
  <img src="/assets/wattson-heirloom/media/angles/Side-Front.jpeg" alt="Side front view" />
  <img src="/assets/wattson-heirloom/media/angles/Back.jpeg" alt="Back view" />
  <img src="/assets/wattson-heirloom/media/angles/Handle.jpeg" alt="Handle view" />
  <img src="/assets/wattson-heirloom/media/angles/In-hand-Left.jpeg" alt="In hand left view" />
  <img src="/assets/wattson-heirloom/media/angles/In-hand-Right.jpeg" alt="In hand right view" />
  <img src="/assets/wattson-heirloom/media/angles/In-hand.jpeg" alt="In hand view" />
  <img src="/assets/wattson-heirloom/media/angles/Left.jpeg" alt="Left view" />
  <img src="/assets/wattson-heirloom/media/angles/Right.jpeg" alt="Right view" />
  <img src="/assets/wattson-heirloom/media/angles/Top.jpeg" alt="Top view" />
  <img src="/assets/wattson-heirloom/media/assembly/all-parts.jpeg" alt="There were a shocking number of parts when I put them all together." />
  <img src="/assets/wattson-heirloom/media/assembly/dev-board.jpeg" alt="This is the development/prototype board. The project stayed in this state for the majority of development." />
  <img src="/assets/wattson-heirloom/media/assembly/inside-1.jpeg" alt="The separated front and back once the device was assembled. This allows access to the MCU once assembled." />
  <img src="/assets/wattson-heirloom/media/assembly/inside-2.jpeg" alt="The top face is a separate piece with all of its pieces screwed into place." />
  <img src="/assets/wattson-heirloom/media/assembly/inside-3.jpeg" alt="Lots of wires going to/from the protoboard." />
  <img src="/assets/wattson-heirloom/media/assembly/inside-4.jpeg" alt="The battery pack's location." />
  <img src="/assets/wattson-heirloom/media/assembly/inside-trigger.jpeg" alt="The trigger uses a spring for pressure. Then it presses a switch." />
  <img src="/assets/wattson-heirloom/media/assembly/light-rods-assembled.jpeg" alt="The joint of the light rods before connecting the wires." />
  <img src="/assets/wattson-heirloom/media/assembly/light-rods-soldered.jpeg" alt="The joint of the light rods after connecting the wires." />
  <img src="/assets/wattson-heirloom/media/assembly/plugged-in.jpeg" alt="Connecting to the MCU after assembly" />
  <img src="/assets/wattson-heirloom/media/assembly/soldered-mcu.jpeg" alt="The MCU, GPIO expander, and EEPROM" />
  <img src="/assets/wattson-heirloom/media/assembly/wired.jpeg" alt="The main wiring system" />
  <img src="/assets/wattson-heirloom/KiCad/schema.png" className="w-full mb-6" alt="The KiCad schematic" />
  <img src="/assets/wattson-heirloom/media/screens/Menu.jpeg"  alt="Main menu screen" />
  <img src="/assets/wattson-heirloom/media/screens/Radar.jpeg"  alt="The radar screen" />
  <img src="/assets/wattson-heirloom/media/screens/Lights.jpeg"  alt="Lights settings screen" />
  <img src="/assets/wattson-heirloom/media/screens/Lights-Mode.jpeg"  alt="Lights modes screen" />
  <img src="/assets/wattson-heirloom/media/screens/Lights-Brightness.jpeg"  alt="Lights brightness screen" />
  <img src="/assets/wattson-heirloom/media/screens/Lights-Speed.jpeg"  alt="Lights speed screen" />
  <img src="/assets/wattson-heirloom/media/screens/Lights-Direction.jpeg"  alt="Lights direction screen" />
  <img src="/assets/wattson-heirloom/media/screens/Settings.jpeg"  alt="Settings screen" />
  <img src="/assets/wattson-heirloom/media/screens/Settings-Theme-Color.jpeg"  alt="Settings theme color screen" />
  <img src="/assets/wattson-heirloom/media/screens/Settings-Overrid-Plug.jpeg"  alt="Settings for a software override of the plug" />
  <img src="/assets/wattson-heirloom/media/screens/Settings-Override-Trigger.jpeg"  alt="Settings for a software override for the trigger." />
  <img src="/assets/wattson-heirloom/media/screens/Settings-Reset.jpeg"  alt="Settings to reset the device" />
  <img src="/assets/wattson-heirloom/stickers/eye-of-the-storm.png"  alt="Sicker – The Eye Of the Storm" />
  <img src="/assets/wattson-heirloom/stickers/nessi.png"  alt="Sicker – Nessi" />
  <img src="/assets/wattson-heirloom/stickers/nikola-face.png"  alt="Sicker – Nikola face" />
  <img src="/assets/wattson-heirloom/stickers/nikola-sleeping.png"  alt="Sicker – Nikola sleeping" />
</div>

## Parts List

| Part                              | Description                                                     | Link                                                                                               |
| --------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Adafruit QT Py ESP32-S2           | The MCU                                                         | [adafruit](https://www.adafruit.com/product/5325)                                                  |
| 2.2" 18-bit color TFT LCD display | The LCD display                                                 | [adafruit](https://www.adafruit.com/product/1480)                                                  |
| 2-Axis Joystick                   | Used to interact with the screens                               | [adafruit](https://www.adafruit.com/product/245)                                                   |
| I2C Rotary Encoder                | A breakout for the Rotary Encoder                               | [adafruit](https://www.adafruit.com/product/4991)                                                  |
| Rotary Encoder                    | Used to navigate screens                                        | [adafruit](https://www.adafruit.com/product/377)                                                   |
| Prusa PETG                        | The filament used to print all of the parts                     | [prusa3d](https://www.prusa3d.com/category/petg/)                                                  |
| NeoPixel RGB LED                  | 28 pixels per string, 14 per side                               | [adafruit](https://www.adafruit.com/product/1506)                                                  |
| Perma-Proto Board                 | Something I had lying around that worked well for all the parts | [adafruit](https://www.adafruit.com/product/2310)                                                  |
| MCP23017                          | I2C GPIO expander                                               | [adafruit](https://www.adafruit.com/product/732)                                                   |
| EEPROM (24LC32AT-I/SN)            | Storage for settings                                            | [digikey](https://www.digikey.com/en/products/detail/microchip-technology/24LC32AT-I-SN/285049)    |
| 6mm Switch                        | Used for the trigger switch                                     | [adafruit](https://www.adafruit.com/product/367)                                                   |
| 12mm Switch                       | Used for the keypad switches                                    | [digikey](https://www.digikey.com/en/products/detail/omron-electronics-inc-emc-div/B3F-4055/31799) |
| Haptic Vibrator                   | Placed in the handle                                            | [adafruit](https://www.adafruit.com/product/1201)                                                  |
| Illuminated Latching Button       | Power switch for the device                                     | [adafruit](https://www.adafruit.com/product/1442)                                                  |
| AA Battery Holder                 | 4X AA batteries                                                 | [adafruit](https://www.adafruit.com/product/3784)                                                  |

<br />

Also generic capacitors, resistors, BJT, springs, magnets, screws, LEDs.

## Downloads

### 3D Models

If you want to print the objects yourself, here are the 3D models in `.step` format.

- The parts that are printed in PETG: [printables.step](/assets/wattson-heirloom/models/printables.step)
- The electronics and other parts that cannot be printed. These were used to measure/build objects around: [non-printables.step](/assets/wattson-heirloom/models/non-printables.step)

### Schematics

- The schematics were built with KiCad: [wattson.kicad_sch](/assets/wattson-heirloom/KiCad/wattson.kicad_sch)
