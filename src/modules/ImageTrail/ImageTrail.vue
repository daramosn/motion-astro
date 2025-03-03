<template>
  <section class="image-trail" @mousemove="mouseMoveHandler">
    <section class="content">
      <h1>Image trail</h1>
      <div class="buttons">
        <span>Try different animation sequences</span>
        <button
          v-for="button in buttons"
          @click="handleSelectedSeq(button)"
          :data-selected="currentSequence === button"
        >
          {{ button }}
        </button>
      </div>
    </section>

    <div class="images">
      <img
        v-for="(image, i) in images"
        :src="image.src"
        :alt="`images ${i}`"
        ref="my-images"
      />
    </div>
  </section>
</template>

<style>
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src:
    url(https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-400-normal.woff2)
      format('woff2'),
    url(https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-400-normal.woff)
      format('woff');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308,
    U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.image-trail {
  background-color: rgb(5, 21, 4);
  min-height: 100vh;
  font-family: 'Poppins';

  .content {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;

    h1 {
      /* font-size: customClamp(32px, 180px, 576px, 1200px); */
      font-family: Poppins;
      line-height: 160px;
      font-size: 16vw;
      line-height: 16vw;
      font-weight: 700;
      text-wrap: nowrap;
      text-transform: uppercase;
      -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.548);
      color: transparent;
    }

    .buttons {
      display: flex;
      gap: 16px;
      button {
        background-color: rgba(240, 248, 255, 0.219);
        width: 32px;
        aspect-ratio: 1/1;
        border-radius: 50px;

        &:hover {
          background-color: rgba(240, 248, 255, 0.657);
        }

        &[data-selected='true'] {
          background-color: rgba(240, 248, 255, 0.796);
        }
      }
    }
  }

  img {
    width: 210px;
    aspect-ratio: 2/3;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-105%, -105%);
  }
}
</style>

<script lang="ts" setup>
import { animate, type AnimationSequence } from 'motion'
import { ref, useTemplateRef } from 'vue'

import img1 from './images/1.webp'
import img2 from './images/2.webp'
import img3 from './images/3.webp'
import img4 from './images/4.webp'
import img5 from './images/5.webp'
import img6 from './images/6.webp'
import img7 from './images/7.webp'
import img8 from './images/8.webp'
import img9 from './images/9.webp'
import img10 from './images/10.webp'
import img11 from './images/11.webp'

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]
const buttons = [1, 2, 3, 4]

const currentSequence = ref(1)
const $images = useTemplateRef<NodeListOf<HTMLElement>>('my-images')

const treshold = 120
const speedK = 3
let currentImage = 0
let zIndex = 0
let lastX = 0
let lastY = 0

const mouseMoveHandler = (e: MouseEvent) => {
  if (!$images.value) return
  const { x, y } = e

  if (!lastX || !lastY) {
    lastX = x
    lastY = y
  }

  const lastMaxDistance = Math.max(Math.abs(x - lastX), Math.abs(y - lastY))

  if (lastMaxDistance > treshold) {
    currentImage = currentImage === $images.value.length ? 0 : currentImage + 1

    const $image = $images.value[currentImage]
    if (!$image) return

    $image.style.zIndex = `${zIndex}`
    const speed = { x: e.movementX * speedK, y: e.movementY * speedK }

    const posTarget = { x: x + speed.x, y: y + speed.y }

    const sequence: { [key: number]: AnimationSequence } = {
      '1': [
        [$image, { opacity: 1, scale: 1, x: lastX, y: lastY }, { duration: 0 }],
        [
          $image,
          { x: posTarget.x, y: posTarget.y },
          { type: 'spring', stiffness: 40, damping: 15, mass: 0.1 }
        ],
        [$image, { opacity: 0, scale: 1.3 }, { duration: 0.2, delay: -1.2 }],
        [$image, { opacity: 0, scale: 1 }, { duration: 0 }]
      ] as AnimationSequence,

      '2': [
        [$image, { opacity: 1, scale: 1, x: lastX, y: lastY }, { duration: 0 }],
        [
          $image,
          { x: posTarget.x, y: posTarget.y },
          { type: 'spring', stiffness: 40, damping: 15, mass: 0.1 }
        ],
        [$image, { opacity: 0, scale: 0 }, { duration: 0.2, delay: -1.2 }],
        [$image, { opacity: 0, scale: 1 }, { duration: 0 }]
      ] as AnimationSequence,

      '3': [
        [
          $image,
          { opacity: 1, scaleX: 1, scaleY: 1, x: x, y: y, top: 0 },
          { duration: 0 }
        ],
        [$image, { opacity: 1 }, { duration: 0.3 }],
        [$image, { scaleX: 0.9 }, { duration: 0.1 }],
        [
          $image,
          { scaleX: 0.9, scaleY: 1.2, transformOrigin: '50% 0%', opacity: 0.7 },
          { duration: 0.3, delay: -0.15 }
        ],
        [$image, { opacity: 0, top: 1200 }, { ease: 'easeOut', duration: 0.2 }],
        [
          $image,
          { opacity: 0, scaleX: 1, scaleY: 1, top: 0, transformOrigin: '50% 50%' },
          { duration: 0 }
        ]
      ] as AnimationSequence,

      '4': [
        [
          $image,
          { opacity: 1, scale: 1, x: lastX, y: lastY, top: 0, left: 0 },
          { duration: 0 }
        ],
        [
          $image,
          { x: posTarget.x, y: posTarget.y },
          { type: 'spring', stiffness: 40, damping: 15, mass: 0.1 }
        ],
        [
          $image,
          { opacity: 0, scale: 0, top: getRandomNumber(), left: getRandomNumber() },
          { duration: 0.3, delay: -0.8 }
        ],
        [$image, { scale: 1, top: 0, left: 0 }, { duration: 0 }]
      ] as AnimationSequence
    }

    animate(sequence[currentSequence.value])
    lastX = posTarget.x
    lastY = posTarget.y
    zIndex++
  }
}

const getRandomNumber = () => {
  let sign = Math.random() < 0.5 ? -1 : 1 // Randomly choose -1 or 1
  return sign * (1200 + Math.random() * (1500 - 1200))
}

const handleSelectedSeq = (number: number) => {
  currentSequence.value = number
}
</script>
