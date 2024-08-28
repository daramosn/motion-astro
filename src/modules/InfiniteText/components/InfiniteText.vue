<template>
  <main class="infinite-text">
    <section class="hero">
      <img :src="image1.src" alt="art-museum" />
      <div class="text-container">
        <div class="text">
          <p aria-hidden="true">Infinite text with move on scroll -</p>
          <p>Infinite text with move on scroll -</p>
          <p aria-hidden="true">Infinite text with move on scroll -</p>
        </div>
      </div>
    </section>
    <section class="content">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum in
        fugiat ullam optio quidem error, sequi eius, adipisci delectus voluptas
        doloremque voluptatem aliquid! Nisi voluptas quis totam quidem dolor.
        Minus?
      </p>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import image1 from '../images/art-museum.jpg'

let progress = 0
let direction = 1

function slide() {
  const $text = document.body.querySelector('.text') as HTMLElement

  if (progress < -100 / 3) progress = 0
  if (0 < progress) progress = -100 / 3
  $text.style.transform = `translateX(${-100 / 3 + progress}%)`

  progress += 0.03 * direction

  requestAnimationFrame(slide)
}

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)

  slide()

  gsap.registerPlugin(ScrollTrigger)
  gsap.to('.text-container', {
    scrollTrigger: {
      trigger: document.body.querySelector('section'),
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      onUpdate: (e) => (direction = -e.direction)
    },
    x: '-=300px'
  })
})
</script>

<style>
.infinite-text {
  height: 200vh;

  .hero {
    font-family: 'Bebas Neue';
    height: 100svh;
    contain: paint;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .text-container {
      font-family: 'Bebas Neue';
      position: fixed;
      bottom: 32px;
      text-wrap: nowrap;

      .text {
        display: flex;
        transform: translate(-33.333333%);
        p {
          text-transform: uppercase;
          padding-left: 32px;
          font-weight: 600;
          letter-spacing: 4px;
          margin: 0;
          font-size: customClamp(96px, 196px, 536px, 1200px);
        }
      }
    }
  }

  .content {
    height: 100vh;
    display: grid;
    place-content: center;
    padding: max(32px, calc((100% - 1200px) / 2));

    p {
      font-weight: 300;
      letter-spacing: 1px;
      text-wrap: pretty;
      margin: 0;
      font-size: customClamp(32px, 42px, 536px, 1200px);
    }
  }
}
</style>
