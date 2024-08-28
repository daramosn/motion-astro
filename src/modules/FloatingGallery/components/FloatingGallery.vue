<template>
  <main class="floating-gallery" @mousemove="mouseMoveHandler">
    <h1>Floating gallery</h1>
    <section class="float-1">
      <img :src="img1.src" alt="woman" />
      <img :src="img2.src" alt="woman" />
      <img :src="img3.src" alt="woman" />
    </section>
    <section class="float-2">
      <img :src="img4.src" alt="woman" />
      <img :src="img5.src" alt="woman" />
      <img :src="img6.src" alt="woman" />
    </section>
    <section class="float-3">
      <img :src="img7.src" alt="woman" />
      <img :src="img8.src" alt="woman" />
      <img :src="img9.src" alt="woman" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import img1 from '../images/free-photo-of-mujer-desierto-sentado-modelo.jpeg'
import img3 from '../images/free-photo-of-paisaje-montanas-pueblo-bosque.jpeg'
import img4 from '../images/free-photo-of-paisaje-naturaleza-punto-de-referencia-viaje.jpeg'
import img5 from '../images/pexels-photo-13332942.jpeg'
import img6 from '../images/pexels-photo-24375005.webp'
import img7 from '../images/pexels-photo-24405949.webp'
import img8 from '../images/pexels-photo-6779121.webp'
import img9 from '../images/pexels-photo-982263.jpeg'
import img2 from '../images/pexels-vlraw-24407569.jpg'

let requestAnimationFrameId = -1
let xMove = 0
let yMove = 0
const speed = 0.01
const inertia = 0.04 // inertia/easing

const lerp = (start: number, end: number, amount: number) => {
  return start * (1 - amount) + end * amount
}

const mouseMoveHandler = (e: MouseEvent) => {
  const { movementX, movementY } = e
  xMove += movementX * speed
  yMove += movementY * speed

  if (requestAnimationFrameId === -1) {
    requestAnimationFrameId = requestAnimationFrame(animation)
  }
}

const animation = () => {
  const $sections = document.body.querySelectorAll(
    '.floating-gallery section'
  ) as NodeListOf<HTMLElement>

  xMove = lerp(xMove, 0, inertia)
  yMove = lerp(yMove, 0, inertia)

  $sections.forEach((section, index) => {
    section.style.left = `${(xMove * 1) / (index + 1) + section.getBoundingClientRect().left}px`
    section.style.top = `${(yMove * 1) / (index + 1) + section.getBoundingClientRect().top}px`
  })

  // GSAP version
  // gsap.set($sections[0], { x: `+=${xMove}`, y: `+=${yMove}` })
  // gsap.set($sections[1], { x: `+=${xMove * 0.5}`, y: `+=${yMove * 0.5}` })
  // gsap.set($sections[2], { x: `+=${xMove * 0.25}`, y: `+=${yMove * 0.25}` })

  if (Math.abs(xMove) > 0.01 || Math.abs(yMove) > 0.01) {
    requestAnimationFrame(animation)
  } else {
    cancelAnimationFrame(requestAnimationFrameId)
    requestAnimationFrameId = -1
  }
}
</script>

<style>
.floating-gallery {
  background-color: rgb(9, 9, 9);
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: clip;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    letter-spacing: 3px;
    font-weight: 400;
  }
  section {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;

    img {
      position: absolute;
      top: 0;
    }
  }

  .float-1 {
    filter: brightness(0.7);
    img:nth-of-type(1) {
      width: 230px;
      top: 5%;
      left: 3%;
    }

    img:nth-of-type(2) {
      width: 300px;
      top: 10%;
      left: 60%;
    }
    img:nth-of-type(3) {
      width: 150px;
      top: 25%;
      left: 88%;
    }
  }
  .float-2 {
    filter: brightness(0.85);
    img:nth-of-type(1) {
      width: 180px;
      top: 56%;
      left: 8%;
    }

    img:nth-of-type(2) {
      width: 200px;
      top: 30%;
      left: 39%;
    }
    img:nth-of-type(3) {
      width: 200px;
      top: 60%;
      left: 60%;
    }
  }
  .float-3 {
    filter: brightness(1);
    img:nth-of-type(1) {
      width: 150px;
      top: 62%;
      left: 82%;
    }

    img:nth-of-type(2) {
      width: 180px;
      top: 3%;
      left: 26%;
    }
    img:nth-of-type(3) {
      width: 282px;
      top: 74%;
      left: 27%;
    }
  }
}
</style>
