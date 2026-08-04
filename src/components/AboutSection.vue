<template>
  <section id="about" class="about-section" ref="root">
    <div class="inner">
      <header class="about-head">
        <span class="sub-label">À propos & Expertise</span>
        <h2 class="gradient-title">Concepteur Développeur d'Applications</h2>
        <p class="intro">
          Titulaire du <strong>Titre RNCP Niveau 6 (CDA)</strong>, je conçois et développe des applications web et mobiles sur mesure, performantes et sécurisées. De la modélisation de base de données à l'intégration d'interfaces modernes, j'apporte une vision globale et rigoureuse à chaque projet.
        </p>
      </header>

      <div class="skills-categories">
        <!-- Groupe Front-end -->
        <div class="panel">
          <h3 class="panel-title">Front-end & Mobile</h3>
          <ul class="skills">
            <li>Vue.js 3</li>
            <li>React</li>
            <li>React Native</li>
            <li>Nuxt</li>
            <li>JavaScript</li>
          </ul>
        </div>

        <!-- Groupe Back-end & BDD -->
        <div class="panel">
          <h3 class="panel-title">Back-end & BDD</h3>
          <ul class="skills">
            <li>NestJS</li>
            <li>Laravel</li>
            <li>MySQL</li>
            <li>Prisma ORM</li>
            <li>API REST</li>
          </ul>
        </div>

        <!-- Groupe DevOps & CMS -->
        <div class="panel">
          <h3 class="panel-title">DevOps & Outils</h3>
          <ul class="skills">
            <li>Docker</li>
            <li>Git & GitHub</li>
            <li>WordPress</li>
            <li>Figma</li>
          </ul>
        </div>

        <!-- Groupe Soft Skills -->
        <div class="panel">
          <h3 class="panel-title">Atouts & Methodes</h3>
          <ul class="soft-list">
            <li>Travail en équipe</li>
            <li>Adaptabilité</li>
            <li>Rigueur & Autonomie</li>
            <li>Architecture logicielle</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'

// Référence vers le noeud HTML de la section À propos pour l'animation GSAP
const root = ref(null)

/**
 * Hook au montage du composant.
 * Initialise l'animation de défilement (ScrollTrigger GSAP) sur les éléments de la section.
 */
onMounted(() => {
  useGsapReveal(root.value)
})
</script>

<style scoped>
.about-section {
  padding: 8rem 0 6rem;
  position: relative;
}

.inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.sub-label {
  display: inline-block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}

.about-head {
  max-width: 940px;
  margin: 0 0 3.5rem;
}

.about-head h2 {
  margin: 0 0 1.2rem;
  font-size: clamp(2rem, 1.6rem + 2.2vw, 3.8rem);
}

.intro {
  font-size: clamp(1rem, 0.95rem + 0.5vw, 1.3rem);
  line-height: 1.6;
  opacity: 0.88;
  max-width: 75ch;
}

.skills-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.8rem;
}

.panel {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
  border: 1px solid rgba(255,255,255,0.07);
  padding: 1.8rem 1.6rem;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel:before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 15%, rgba(255,255,255,0.06), transparent 60%);
  pointer-events: none;
}

.panel-title {
  margin: 0 0 1.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--color-heading-grad-from);
}

.skills {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.skills li {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 0.45rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
  font-weight: 500;
}

.soft-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.soft-list li {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0 3rem;
  }

  .inner {
    padding: 0 0.5rem;
  }

  .about-head {
    margin-bottom: 2.2rem;
  }

  .skills-categories {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .panel {
    padding: 1.4rem 1.1rem;
    border-radius: 16px;
  }
}
</style>
