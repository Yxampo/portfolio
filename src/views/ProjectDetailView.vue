<template>
  <div class="project-page" v-if="project">
    <header class="project-hero">
      <h1 class="gradient-title">{{ project.title }}</h1>
      <p class="tagline">{{ project.tagline }}</p>
      <ul class="meta">
        <li><strong>Année:</strong> {{ project.year }}</li>
        <li><strong>Rôle:</strong> {{ project.role }}</li>
        <li v-if="project.stack"><strong>Stack:</strong> {{ project.stack.join(', ') }}</li>
      </ul>
    </header>

    <section class="content">
      <h2 class="gradient-title">Contexte</h2>
      <p class="muted">{{ project.description }}</p>

      <h3 class="gradient-title section-subhead">Galerie</h3>
      <div class="gallery" v-if="project.gallery">
        <div v-for="(img, i) in project.gallery" :key="i" class="g-item">
          <img :src="img" alt="image du projet" />
        </div>
      </div>
    </section>

    <footer class="back-link">
      <RouterLink to="/">← Retour à l'accueil</RouterLink>
    </footer>
  </div>
  <div v-else class="project-page">
    <p>Projet introuvable.</p>
    <RouterLink to="/">← Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { findProject } from '../data/projects'
import { computed } from 'vue'

const route = useRoute()

/**
 * Propriété calculée récupérant les détails du projet selon le paramètre de route :slug.
 */
const project = computed(() => findProject(route.params.slug))
</script>

<style scoped>
.project-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem 6rem;
}

.project-hero {
  margin-bottom: 3rem;
}

.project-hero h1 {
  font-size: clamp(2.2rem, 1.8rem + 3vw, 4.2rem);
  line-height: 1.02;
}

.tagline {
  margin-top: 1rem;
  font-size: var(--step-1);
  opacity: 0.75;
}

.meta {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  margin: 1.5rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.75;
}

.content h2 {
  margin-bottom: 1rem;
}

.section-subhead {
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}

.style {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
}

.colors {
  display: flex;
  gap: 0.65rem;
}

.color-swatch {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 1rem;
}

.g-item {
  aspect-ratio: 16/10;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.g-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.back-link {
  margin-top: 4rem;
  font-size: var(--step--1);
}

@media (max-width: 640px) {
  .project-page {
    padding: 2.2rem 0.5rem 4rem;
  }

  .style {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>