<!--
title: WorkerMouse
description: An AVR project for a simple DIY mouse jiggler, using a minimal number of parts and simple software.
active: true
slug: worker-mouse
tags: avr, atmel, microchip, vusb, usb
date: 02/02/2024
lastModified: 10/12/2025
image: /assets/worker-mouse/board-top.jpeg
-->

## About

### Hardware

The WorkerMouse was a project I did as an exercise in learning about USB and HID devices. I began with an ESP32-S2 but quickly realized it was overkill for creating a simple mouse. I’m very familiar with the ATtiny85, but it doesn’t have a hardware USB peripheral. Luckily, I was able to stand on the shoulders of giants — the [V-USB](https://www.obdev.at/products/vusb/index.html) project was built to run on AVR MCUs. This software-only USB implementation allows the ATtiny85 to act as a low-speed USB 1.1 device, which is perfectly adequate for a HID mouse.

The V-USB site is also a treasure trove of information for building simple USB devices. It includes dozens of reference projects with both hardware and software documentation. The [HIDKeys](https://www.obdev.at/products/vusb/hidkeys.html) example was a perfect reference for the hardware side of this project, especially when combined with the `Hardware` section of their overview page.

### Software

With the hardware design and USB driver settled, all I needed to do was write some software to periodically move the mouse. I chose to write it using [the AVR Toolchain (v3.7.0)](https://www.microchip.com/en-us/tools-resources/develop/microchip-studio/gcc-compilers), which relies on the excellent [avr-libc (v2.0.0)](https://github.com/avrdudes/avr-libc). I took this approach as an exploration into using the toolchain developed by the hardware manufacturer, rather than a third-party abstraction like Arduino.

I wanted the mouse movements to feel somewhat realistic — mostly just for fun. This meant the only software I needed to write was a timer to periodically move the mouse, use a pseudo-random number generator to pick movement amounts and speeds, and a USB report generator. Altogether, that’s less than 200 lines of code (not including the USB device configuration such as name, VID/PID, etc).

Once the project was complete, I decided to explore officially registering the USB device. Since I didn’t want to pay the $6,000 required by the USB-IF to acquire my own Vendor ID, I went with [pid.codes](https://pid.codes/). They own the Vendor ID `1209` and allow any open-source project to register a Product ID under it. I registered the WorkerMouse as [VID 1209, PID F480](https://pid.codes/1209/F480/).

All in, the software ended up being 2636 bytes of ROM and 89 bytes of RAM.

## Media

<div data-component="MediaCollage" class="mb-6">
  <img src="/assets/worker-mouse/assembled.jpeg" alt="The assembled device" />
  <img src="/assets/worker-mouse/board-top.jpeg" alt="Top view of the circuit board" />
  <img src="/assets/worker-mouse/board-bottom.jpeg" alt="Bottom view of the circuit board" />
  <img src="/assets/worker-mouse/board-side.jpeg" alt="Side view of the circuit board" />
  <img src="/assets/worker-mouse/case-top.jpeg"/>
  <img src="/assets/worker-mouse/case-bottom.jpeg"/>
  <img src="/assets/worker-mouse/schema.png" alt="The KiCad schematic" />
</div>

## Parts List

- 1 [ATTINY85 20PU](https://www.mouser.com/ProductDetail/Microchip-Technology/ATTINY85-20PU?qs=8jWQYweyg6NCiiaOb5GI9Q%3D%3D)
- 1 [16MHz Crystal](https://www.adafruit.com/product/2215)
  - 2 20pF capacitors
- 1 [USB-C receptacle](https://www.adafruit.com/product/4090)
- 2 [1N5227B - Zener Diodes 3.6V 0.5W](https://www.mouser.com/ProductDetail/512-1N5227B)
- 1 10µF Capacitor
- 1 0.1µF Capacitor
- 2 47-Ohm Resistors
- 1 2.2K-Ohm Resistor
- 1 5.1K-Ohm Resistor

## Downloads

### 3D Models

I used PETG for the case, and separate colors for the lettering / case. This was the video I followed for using two colors with one toolhead: https://www.youtube.com/watch?v=zk1vKVphE1M.

If you'd rather not use two colors, you can simply omit the letter models and the letters will be debossed.

- [Zip file with all models](/assets/worker-mouse/3d-model.zip)

### Compiled Firmware

The compiled firmware can be downloaded from the Github repo at [/firmware/compiled](https://github.com/zbauman3/WorkerMouse/tree/main/firmware/compiled).
