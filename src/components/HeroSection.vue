<template>
  <section id="home" class="hero-section" ref="root">
    <div class="inner">

      <h1 class="hero-title">
        <span class="gradient-title">Concevoir & Développer</span><br/>
        des applications web & mobiles sur mesure
      </h1>
      <p class="tagline">Yoan Fleuret — Portfolio Architecture & Développement Fullstack</p>

      <div class="hero-actions">
        <a href="#projects" class="btn-primary" @click.prevent="scrollTo('#projects')">
          Voir mes projets
        </a>
        <a href="#contact" class="btn-secondary" @click.prevent="scrollTo('#contact')">
          Me contacter
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'

// Référence vers l'élément racine de la section Hero pour GSAP
const root = ref(null)

/**
 * Déclenche un défilement fluide (smooth scroll) vers un ancrage donné dans la page.
 * 
 * @param {string} selector - L'élément cible (ex: '#projects', '#contact')
 */
function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Hook de cycle de vie exécuté au montage du composant.
 * Déclenche l'animation d'apparition fluide des titres et textes via GSAP.
 */
onMounted(() => {
  useGsapReveal(root.value)
})
</script>

<style scoped>
.hero-section {
  padding: 10vh 0 12vh;
  display: flex;
  align-items: center;
}

.inner {
  width: 100%;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-heading-grad-from);
  margin-bottom: 1.8rem;
  backdrop-filter: blur(6px);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-heading-grad-from);
  box-shadow: 0 0 10px var(--color-heading-grad-from);
}

.hero-title {
  font-size: clamp(2.3rem, 6.2vw, 5.6rem);
  line-height: 1.05;
  letter-spacing: -1px;
}

.tagline {
  margin-top: 1.4rem;
  font-size: clamp(1rem, 0.95rem + 0.5vw, 1.35rem);
  opacity: 0.8;
  max-width: 65ch;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2.2rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.8rem;
  background: linear-gradient(90deg, var(--color-heading-grad-from), var(--color-heading-grad-to));
  color: #030f1a;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 30px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(181, 223, 202, 0.3);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4vh 0 4vh;
  }
  .status-badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
  .btn-primary, .btn-secondary {
    justify-content: center;
    width: 100%;
  }
}
</style>
