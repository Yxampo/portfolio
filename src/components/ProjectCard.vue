<template>
  <article class="project-card" ref="card">
    <div class="project-media">
      <img :src="image" :alt="title + ' aperçu'" loading="lazy" />
    </div>
    <div class="card-content">
      <h3 class="gradient-title">{{ title }}</h3>
      <p class="muted short-desc">{{ short }}</p>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Propriétés réactives du composant carte de projet.
 * @property {string} title - Titre du projet
 * @property {string} short - Courte description / résumé
 * @property {string} image - URL du visuel principal
 */
const props = defineProps({
  title: String,
  short: String,
  image: { type: String, default: '/placeholder.svg' }
})

const card = ref(null)
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  min-width: 0;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.project-media {
  position: relative;
  aspect-ratio: 16/10;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.project-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.4s ease;
}

.project-card:hover .project-media img {
  transform: scale(1.04);
}

.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.project-card h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
}

.short-desc {
  font-size: 0.88rem;
  line-height: 1.45;
  margin-top: auto;
  opacity: 0.8;
}
</style>
