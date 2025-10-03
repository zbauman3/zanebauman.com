<!--
title: WorkerMouse
description: An AVR project for a simple DIY mouse jiggler, using a minimal number of parts and simple software.
active: true
slug: worker-mouse
tags: arduino, avr, atmel, microchip, vusb, usb
date: 02/02/2024
-->

<img src="/assets/worker-mouse/assembled.jpeg" class="w-full mb-6" />

This project uses [V-USB](https://www.obdev.at/products/vusb/index.html), for a firmware-only USB driver. This USB device is also registered - via [pid.codes](https://pid.codes/) - [VID 1209, PID F480](https://pid.codes/1209/F480/).

## Media

<img src="/assets/worker-mouse/assembled.jpeg" class="w-full mb-6" />
<img src="/assets/worker-mouse/board-top.jpeg" class="w-full mb-6" />
<img src="/assets/worker-mouse/board-bottom.jpeg" class="w-full mb-6" />
<img src="/assets/worker-mouse/board-side.jpeg" class="w-full mb-6" />
<img src="/assets/worker-mouse/case-top.jpeg" class="w-full mb-6" />
<img src="/assets/worker-mouse/case-bottom.jpeg" class="w-full mb-6" />

<video controls class="w-full mb-6">
  <source src="/assets/worker-mouse/video.mov">
</video>

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

## 3D Models

I used PETG for the case, and separate colors for the lettering / case. This was the video I followed for using two colors with one toolhead: https://www.youtube.com/watch?v=zk1vKVphE1M.

If you'd rather not use two colors, you can simply omit the letter models and the letters will be debossed.

### Downloads

- [Zip file with all models](/assets/worker-mouse/models/all.zip)
- [The Github directory containing the models](https://github.com/zbauman3/WorkerMouse/tree/main/docs/assets/models)

## Schematics

<img src="/assets/worker-mouse/schema.png" class="img-full" />
