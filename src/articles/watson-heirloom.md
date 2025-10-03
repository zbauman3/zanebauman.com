<!--
title: Watson Heirloom
description: A project to build a 3D-printed "Telemetry Receiver Module" for the Apex Legends character "Watson".
active: true
slug: watson-heirloom
tags: arduino, esp32, esp32-s2, Espressif, 3D-printing, graphics
date: 03/15/2024
-->

<img src="/assets/watson-heirloom/wattson-heirloom.jpg" className="w-full mb-6" />

Wattson is a character from the video game [Apex Legends](https://www.ea.com/games/apex-legends). This is a project to build a 3D-printed version of her "Telemetry Receiver Module" [Heirloom](https://apexlegends.fandom.com/wiki/Heirloom), with functioning electronics (not a real radar, thought).

## Media

### Assembled

<img src="/assets/watson-heirloom/media/angles/Side Back.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Side Front.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Back.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Handle.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/In-hand Left.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/In-hand Right.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/In-hand.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Left.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Right.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/angles/Top.jpeg" class="w-full mb-6" />
<video controls="controls" class="w-full mb-6" name="">
  <source src="/assets/watson-heirloom/media/videos/Radar Screen.MOV">
</video>
<video controls="controls" class="w-full mb-6" name="">
  <source src="/assets/watson-heirloom/media/videos/Rainbow Lights.MOV">
</video>
<video controls="controls" class="w-full mb-6" name="">
  <source src="/assets/watson-heirloom/media/videos/Trigger.MOV">
</video>

### Assembly

<img src="/assets/watson-heirloom/media/assembly/all-parts.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/dev-board.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/inside-1.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/inside-2.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/inside-3.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/inside-4.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/inside-trigger.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/light-rods-assembled.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/light-rods-soldered.jpeg" class="w-full mb-6" />
<video controls="controls" class="w-full mb-6" name="Light Rods Assembly">
  <source src="/assets/watson-heirloom/media/assembly/light-rods.mov">
</video>
<img src="/assets/watson-heirloom/media/assembly/plugged-in.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/soldered-mcu.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/assembly/wired.jpeg" class="w-full mb-6" />

### Screens

<img src="/assets/watson-heirloom/media/screens/Menu.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Radar.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Lights.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Lights > Mode.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Lights > Brightness.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Lights > Speed.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Lights > Direction.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Settings.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Settings > Theme Color.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Settings > Overrid Plug.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Settings > Override Trigger.jpeg" class="w-full mb-6" />
<img src="/assets/watson-heirloom/media/screens/Settings > Reset.jpeg" class="w-full mb-6" />

### Stickers

<img src="/assets/watson-heirloom/stickers/eye-of-the-storm.png" class="img-sm" />
<img src="/assets/watson-heirloom/stickers/nessi.png" class="img-sm" />
<img src="/assets/watson-heirloom/stickers/nikola-face.png" class="img-sm" />
<img src="/assets/watson-heirloom/stickers/nikola-sleeping.png" class="img-sm" />

## Parts Info

These are all of the parts that were bought to build this project. There were some odds and ends that I already owned and cannot find a good link for (plugs, wires, etc).

### Filament

I used Prusa PETG for all of the filament. The colors used were Orange, White, and Anthracite Grey.

https://www.prusa3d.com/category/petg/

### NeoPixels

The four rods on the end are each covered with one 28-pixel strip. The rods are all wired in parallel.

https://www.adafruit.com/product/1506

### Perma-Proto Board

This board is meant to be used with a Raspberry Pi, but after looking at its size and layout, it proved perfect for mounting the QTPY ESP32-S2, MCP23017, and EEPROM.

https://www.adafruit.com/product/2310

### QTPY ESP32 S2

The main MCU.

https://www.adafruit.com/product/5325

### MCP23017

An I2C I/O expander. I likely could have used less inputs for the buttons, but this seemed simpler.

https://www.adafruit.com/product/732

### EEPROM (24LC32AT-I/SN)

https://www.digikey.com/en/products/detail/microchip-technology/24LC32AT-I-SN/285049

### 6mm Switch (trigger)

https://www.adafruit.com/product/367

### 12mm Switch (buttons)

https://www.digikey.com/en/products/detail/omron-electronics-inc-emc-div/B3F-4055/31799

### Haptic Vibrator

Placed in the grip, just under the batteries.

https://www.adafruit.com/product/1201

### 2-Axis Joystick

https://www.adafruit.com/product/245

### I2C Rotary Encoder Breakout

In hind-sight, this was more difficult to work with than just a standard rotary encoder. Reading and clearing interrupts over I2C was a lot of unnecessary overhead.

https://www.adafruit.com/product/4991

### Rotary Encoder

https://www.adafruit.com/product/377

### 16mm Illuminated Latching Push Button

https://www.adafruit.com/product/1442

### 4 x AA Battery Holder with 2.1mm Plug

https://www.adafruit.com/product/3784

### 2.2" 18-bit color TFT LCD display

https://www.adafruit.com/product/1480

### Other

Generic Capacitors, Resistors, BPJ transistors, springs, magnets, screws, LEDs.

## 3D Models

If you want to print the objects yourself, here are the 3D models in `.step` format.

### Printable Parts

These represent the parts that are printed in PETG.

[printables.step](/assets/watson-heirloom/models/printables.step)

### Non-printable Parts

These represent the electronics and other parts that cannot be printed. These were used to measure/build objects around.

[non-printables.step](/assets/watson-heirloom/models/non-printables.step)

## Schematics

The schematics were built with KiCad.

- [wattson.kicad_sch](/assets/watson-heirloom/KiCad/wattson.kicad_sch)

<img src="/assets/watson-heirloom/KiCad/schema.png" className="w-full mb-6" />
