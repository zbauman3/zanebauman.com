<!--
title: Wattson Heirloom
description: A project to build a 3D-printed "Telemetry Receiver Module" for the Apex Legends character "Wattson".
active: true
slug: wattson-heirloom
tags: arduino, esp32, esp32-s2, Espressif, 3D-printing, graphics, highlight
date: 03/15/2024
image: /assets/wattson-heirloom/media/cover.jpeg
-->

Wattson is a character from the video game [Apex Legends](https://www.ea.com/games/apex-legends). This is a project to build a 3D-printed version of her "Telemetry Receiver Module" [Heirloom](https://apexlegends.fandom.com/wiki/Heirloom), with functioning electronics (not a real radar, thought).

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

## Parts Info

These are all of the parts that were bought to build this project. There were some odds and ends that I already owned and cannot find a good link for (plugs, wires, etc).

**Filament**

I used Prusa PETG for all of the filament. The colors used were Orange, White, and Anthracite Grey.

https://www.prusa3d.com/category/petg/

**NeoPixels**

The four rods on the end are each covered with one 28-pixel strip. The rods are all wired in parallel.

https://www.adafruit.com/product/1506

**Perma-Proto Board**

This board is meant to be used with a Raspberry Pi, but after looking at its size and layout, it proved perfect for mounting the QTPY ESP32-S2, MCP23017, and EEPROM.

https://www.adafruit.com/product/2310

**QTPY ESP32 S2**

The main MCU.

https://www.adafruit.com/product/5325

**MCP23017**

An I2C I/O expander. I likely could have used less inputs for the buttons, but this seemed simpler.

https://www.adafruit.com/product/732

**EEPROM (24LC32AT-I/SN)**

https://www.digikey.com/en/products/detail/microchip-technology/24LC32AT-I-SN/285049

**6mm Switch (trigger)**

https://www.adafruit.com/product/367

**12mm Switch (buttons)**

https://www.digikey.com/en/products/detail/omron-electronics-inc-emc-div/B3F-4055/31799

**Haptic Vibrator**

Placed in the grip, just under the batteries.

https://www.adafruit.com/product/1201

**2-Axis Joystick**

https://www.adafruit.com/product/245

**I2C Rotary Encoder Breakout**

In hind-sight, this was more difficult to work with than just a standard rotary encoder. Reading and clearing interrupts over I2C was a lot of unnecessary overhead.

https://www.adafruit.com/product/4991

**Rotary Encoder**

https://www.adafruit.com/product/377

**16mm Illuminated Latching Push Button**

https://www.adafruit.com/product/1442

**4 x AA Battery Holder with 2.1mm Plug**

https://www.adafruit.com/product/3784

**2.2" 18-bit color TFT LCD display**

https://www.adafruit.com/product/1480

**Other**

Generic Capacitors, Resistors, BPJ transistors, springs, magnets, screws, LEDs.

## 3D Models

If you want to print the objects yourself, here are the 3D models in `.step` format.

### Printable Parts

These represent the parts that are printed in PETG.

[printables.step](/assets/wattson-heirloom/models/printables.step)

### Non-printable Parts

These represent the electronics and other parts that cannot be printed. These were used to measure/build objects around.

[non-printables.step](/assets/wattson-heirloom/models/non-printables.step)

## Schematics

The schematics were built with KiCad.

- [wattson.kicad_sch](/assets/wattson-heirloom/KiCad/wattson.kicad_sch)

<img src="/assets/wattson-heirloom/KiCad/schema.png" className="w-full mb-6" alt="The KiCad schematic" />
