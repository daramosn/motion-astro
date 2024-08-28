<template>
  <main class="sticky">
    <section class="landing">
      <h1>THE <span>ESCAPE</span></h1>
      <p>AN EXPLORATION OF THE SYNTHETIC ERA.</p>
    </section>
    <section class="description">
      <p>
        As data conglomerates reveled in the opulence of cognitive wealth, a
        silent underclass manifested, condemned to the digital periphery.
      </p>
    </section>
    <section>
      <article>
        <img :src="img1.src" alt="golden-figure" />
        <h2>THE <span> ALGORITHM</span></h2>
        <p>The algorithm's workings are shrouded in complexity.</p>
      </article>
      <article>
        <img :src="img2.src" alt="golden-figure-2" />
        <h2>THE <span> DOGMA </span></h2>
        <p>
          Enshrining the principles of conformity and reinforcing the status
          quo.
        </p>
      </article>
      <article>
        <img :src="img3.src" alt="golden-figure-3" />
        <h2>THE <span> ARCHITECTS </span></h2>
        <p>The elusive entities, lacking human form, operate in the shadows.</p>
      </article>
      <article>
        <img :src="img4.src" alt="golden-figure-4" />
        <h2>THE <span> WASTELAND </span></h2>
        <p>This overlooked realm, a consequence of algorithmic judgments.</p>
      </article>
      <article>
        <img :src="img6.src" alt="golden-figure-6" />
        <h2>THE <span> NARRATIVE </span></h2>
        <p>The collective story sculpted by the architects.</p>
      </article>
    </section>
    <section class="ending">
      <p>
        Lost in perpetual dependency, inhabitants of the Synthetic Era found
        solace in cryptic simulations, where pain ebbed and cognitive loads
        momentarily lightened.
      </p>
      <img :src="img5.src" alt="golden-figure-5" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import img1 from '../images/1.webp'
import img2 from '../images/2.webp'
import img3 from '../images/3.webp'
import img4 from '../images/4.webp'
import img5 from '../images/5.webp'
import img6 from '../images/6.webp'

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)

  const $articles = document.body.querySelectorAll('.sticky section article')

  $articles.forEach((article, index) => {
    const isLast = index === $articles.length - 1

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: 'top top',
        end: '+=300%',
        scrub: true
      }
    })

    tl.to(article, {
      ease: 'none',
      backgroundColor: !isLast ? '#362e26' : '',
      duration: 1
    }).to(
      article.querySelector('img'),
      {
        rotate: '-25deg',
        y: -100,
        startAt: { filter: 'contrast(1)' },
        filter: 'contrast(1.5)',
        padding: '32px',
        duration: 1
      },
      '-=1'
    )
  })
})
</script>

<style>
.sticky {
  background-color: #0e0d0b;
  .landing {
    height: 100vh;
    padding: 64px;
    background-image: url('../images/5.webp');
    background-repeat: no-repeat;
    background-position: calc(100% + 200px) 50%;
    background-size: customClamp(500px, 850px, 536px, 700px);
    display: grid;
    align-content: center;
    justify-content: start;
    justify-items: end;

    h1 {
      margin: 0;
      font-size: customClamp(120px, 160px, 536px, 1200px);
      font-weight: 100;
      span {
        font-family: 'Bebas neue';
        font-weight: 700;
        letter-spacing: 5px;
      }
    }
    p {
      margin: 0;
    }
  }

  .description {
    padding: 64px max(32px, calc((100% - 1200px) / 2));
    font-size: customClamp(24px, 48px, 536px, 1200px);
  }

  article {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 50%;
    padding: 32px;
    overflow: clip;
    background-color: #0e0d0b;
    text-align: center;
    text-wrap: balance;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:nth-child(even) {
      margin-left: auto;
    }
    img {
      width: 50%;
      min-width: 285px;
      margin-bottom: 32px;
      object-fit: cover;
    }
    h2 {
      font-size: customClamp(32px, 48px, 536px, 1200px);
      font-weight: 200;
      span {
        font-family: 'Bebas neue';
        font-weight: 700;
        letter-spacing: 8px;
      }
    }
    p {
      padding: 8px 32px;
      padding-left: 32px;
      font-weight: 600;
      letter-spacing: 4px;
      margin: 0;
    }
  }

  .ending {
    padding: 64px max(32px, calc((100% - 1200px) / 2));
    font-size: customClamp(24px, 48px, 536px, 1200px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    img {
      margin-top: 128px;
      width: customClamp(150px, 400px, 536px, 768px);
    }
  }
}

@media (width<768px) {
  .sticky {
    article {
      width: 100%;
    }
  }
}
</style>
