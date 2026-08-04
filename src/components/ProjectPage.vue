<template>
  <div class="project-shell" v-if="project">
    <!-- En-tête Hero du projet -->
    <header class="hero">
      <div class="badges-row">
        <span v-if="project.projectType === 'cda'" class="badge-tag cda">
          <span class="dot"></span> Titre RNCP CDA
        </span>
        <span v-else-if="project.projectType === 'internship'" class="badge-tag stage">
          <span class="dot"></span> Stage
        </span>
        <span v-else class="badge-tag pro">
          <span class="dot"></span> Projet Web
        </span>
        <span class="badge-year">{{ project.year }}</span>
      </div>

      <h1 class="title gradient-title">{{ project.title }}</h1>
      <p class="subtitle">{{ project.tagline }}</p>

      <!-- Métadonnées sous forme de cartes d'information -->
      <div class="meta-grid">
        <div class="meta-card">
          <span class="meta-label">Rôle</span>
          <span class="meta-val">{{ project.role }}</span>
        </div>
        <div class="meta-card" v-if="project.timeline">
          <span class="meta-label">Durée / Chronologie</span>
          <span class="meta-val">{{ project.timeline }}</span>
        </div>
        <div class="meta-card" v-if="project.collaboration">
          <span class="meta-label">Cadre / Collaboration</span>
          <span class="meta-val">{{ project.collaboration }}</span>
        </div>
      </div>
    </header>

    <!-- Stack Technique -->
    <section class="tech-section" v-if="project.stack?.length">
      <h3 class="section-title">Stack & Technologies</h3>
      <div class="stack-list">
        <span v-for="tech in project.stack" :key="tech" class="tech-pill">
          {{ tech }}
        </span>
      </div>
    </section>

    <!-- Contenu détaillé du projet -->
    <main class="content-body">
      <!-- Section Contexte & Objectifs -->
      <div class="grid-2col" v-if="project.context || project.description || project.objectives?.length">
        <article class="glass-card">
          <span class="card-category">Contexte</span>
          <h2>Contexte du projet</h2>
          <p class="card-text">{{ project.context || project.description }}</p>
        </article>

        <article class="glass-card" v-if="project.objectives?.length">
          <span class="card-category">Objectifs</span>
          <h2>Objectifs principaux</h2>
          <ul class="check-list">
            <li v-for="(obj, i) in project.objectives" :key="i">
              <span class="check-icon">✓</span>
              <span>{{ obj }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Section Fonctionnalités principales -->
      <section class="glass-card full-width" v-if="project.functionalities?.length">
        <div class="card-header">
          <span class="card-category">Fonctionnalités</span>
          <h2>Fonctionnalités clés</h2>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in project.functionalities" :key="i" class="feature-item">
            <span class="feat-num">0{{ i + 1 }}</span>
            <span class="feat-text">{{ f }}</span>
          </div>
        </div>
      </section>

      <!-- Galerie interactive -->
      <section class="gallery-section" v-if="galleryImages?.length">
        <div class="section-header-row">
          <h2>Galerie de visuels</h2>
          <span class="gallery-hint">Cliquer pour agrandir</span>
        </div>
        <div class="gallery-grid">
          <button 
            v-for="(img, i) in galleryImages" 
            :key="i" 
            class="gallery-card" 
            @click="openLightbox(i)"
            aria-label="Agrandir l'image"
          >
            <img :src="img" :alt="project.title + ' capture ' + (i+1)" loading="lazy" />
            <div class="zoom-overlay">
              <span class="zoom-icon">Agrandir</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Navigation Projet Suivant / Précédent -->
      <nav class="project-nav" v-if="next || prev">
        <RouterLink v-if="prev" :to="'/' + prev.slug" class="nav-card prev">
          <span class="nav-dir">← Projet précédent</span>
          <span class="nav-title">{{ prev.title }}</span>
        </RouterLink>
        <div v-else class="nav-spacer"></div>

        <RouterLink v-if="next" :to="'/' + next.slug" class="nav-card next">
          <span class="nav-dir">Projet suivant →</span>
          <span class="nav-title">{{ next.title }}</span>
        </RouterLink>
      </nav>

      <!-- Bouton de retour -->
      <div class="back-wrapper">
        <RouterLink to="/" class="btn-back">
          <span>← Retour au portfolio</span>
        </RouterLink>
      </div>
    </main>

    <!-- Modal Lightbox -->
    <Lightbox v-if="lightbox.open" :images="galleryImages" :index="lightbox.index" @close="closeLightbox" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { projects } from '../data/projects'
import Lightbox from './Lightbox.vue'

// Reçoit la propriété 'slug' transmise par le routeur
const props = defineProps({
  slug: { type: String, required: true }
})

/**
 * Recherche et renvoie l'objet projet correspondant au slug passé en prop.
 */
const project = computed(() => projects.find(p => p.slug === props.slug))

/**
 * Retrouve l'index numérique du projet actif au sein de la liste des projets.
 */
const idx = computed(() => projects.findIndex(p => p.slug === props.slug))

/**
 * Renvoie l'objet du projet précédent s'il existe dans le tableau.
 */
const prev = computed(() => (idx.value > 0 ? projects[idx.value - 1] : null))

/**
 * Renvoie l'objet du projet suivant s'il existe dans le tableau.
 */
const next = computed(() => (idx.value < projects.length - 1 ? projects[idx.value + 1] : null))

/**
 * État réactif contrôlant l'ouverture de la Lightbox et l'index de l'image sélectionnée.
 */
const lightbox = reactive({ open: false, index: 0 })

/**
 * Active l'affichage de la Lightbox pour une image donnée.
 * 
 * @param {number} i - L'index de l'image cliquée
 */
function openLightbox(i) {
  lightbox.open = true
  lightbox.index = i
}

/**
 * Désactive l'affichage de la Lightbox.
 */
function closeLightbox() {
  lightbox.open = false
}

// Module d'importation des images dans les assets
const assetsMap = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })

/**
 * Normalise une chaîne de caractères (suppression d'accents et mise en minuscules)
 * pour faciliter l'association avec les chemins d'images.
 * 
 * @param {string} str - La chaîne à nettoyer
 * @returns {string} - La chaîne nettoyée
 */
function normalize(str) {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/prenium/g, 'premium')
}

/**
 * Propriété calculée recherchant toutes les images de la galerie associées au projet courant.
 */
const galleryImages = computed(() => {
  const p = project.value
  if (!p) return []
  const slug = normalize(p.slug)
  const title = normalize(p.title)
  const entries = Object.entries(assetsMap)
  const matches = entries
    .filter(([path]) => {
      const low = path.toLowerCase()
      return low.includes(slug) || low.includes(title)
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, url]) => url)
  return matches.length ? matches : Array.isArray(p.gallery) ? p.gallery : []
})
</script>

<style scoped>
.project-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}

/* En-tête Hero */
.hero {
  margin-bottom: 3rem;
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.9rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.badge-tag.cda {
  background: linear-gradient(90deg, rgba(181, 223, 202, 0.18), rgba(219, 145, 210, 0.18));
  border: 1px solid rgba(219, 145, 210, 0.35);
  color: var(--color-heading-grad-from);
}

.badge-tag.stage {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.badge-tag.pro {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.badge-year {
  font-size: 0.85rem;
  opacity: 0.6;
}

.title {
  font-size: clamp(2.4rem, 2rem + 3vw, 4.4rem);
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.4rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  max-width: 76ch;
  margin-bottom: 2.2rem;
}

/* Grille de métadonnées */
.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.meta-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.meta-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.55;
}

.meta-val {
  font-size: 0.92rem;
  font-weight: 500;
  color: #ffffff;
}

/* Stack Technique */
.tech-section {
  margin-bottom: 3.5rem;
}

.section-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 0.8rem;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tech-pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #ffffff;
  backdrop-filter: blur(4px);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.tech-pill:hover {
  border-color: var(--color-heading-grad-from);
  background: rgba(255, 255, 255, 0.08);
}

/* Corps du contenu */
.content-body {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.grid-2col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.8rem;
}

/* Cartes Glassmorphism */
.glass-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-card.full-width {
  width: 100%;
}

.card-category {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.55;
  margin-bottom: 0.6rem;
}

.text-accent-pink {
  color: var(--color-heading-grad-to);
  opacity: 0.9;
}

.text-accent-green {
  color: var(--color-heading-grad-from);
  opacity: 0.9;
}

.card-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.glass-card h2 {
  font-size: clamp(1.3rem, 1.1rem + 0.6vw, 1.8rem);
  margin-bottom: 1rem;
  color: #ffffff;
}

.card-text {
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
}

/* Listes de contrôle et puces */
.check-list, .bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.check-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.88);
}

.check-icon {
  color: var(--color-heading-grad-from);
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  margin-top: 0.2rem;
}

.bullet-list li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.85);
}

.bullet-list li:before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--color-heading-grad-to);
  font-size: 0.9rem;
  line-height: 1;
}

/* Fonctionnalités Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.15);
}

.feat-num {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--color-heading-grad-from);
}

.feat-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.45;
}

/* Accents spéciaux */
.glass-card.danger-accent {
  border-top: 2px solid rgba(219, 145, 210, 0.6);
}

.glass-card.success-accent {
  border-top: 2px solid rgba(181, 223, 202, 0.6);
}

.glass-card.highlight-card {
  background: linear-gradient(180deg, rgba(181, 223, 202, 0.04), rgba(219, 145, 210, 0.02));
  border: 1px solid rgba(181, 223, 202, 0.2);
}

.results-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.result-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-size: 0.92rem;
  color: #ffffff;
}

/* Style & Design System */
.style-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.style-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.style-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.6;
}

.color-palette {
  display: flex;
  gap: 0.9rem;
}

.swatch-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.swatch-color {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.swatch-hex {
  font-size: 0.72rem;
  font-family: monospace;
  opacity: 0.7;
}

.font-preview {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Galerie */
.gallery-section {
  margin-top: 1rem;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.2rem;
}

.section-header-row h2 {
  font-size: clamp(1.4rem, 1.2rem + 0.6vw, 1.9rem);
}

.gallery-hint {
  font-size: 0.8rem;
  opacity: 0.55;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.gallery-card {
  position: relative;
  aspect-ratio: 16/10;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.zoom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(3, 15, 26, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zoom-icon {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.gallery-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.gallery-card:hover img {
  transform: scale(1.05);
}

.gallery-card:hover .zoom-overlay {
  opacity: 1;
}

/* Navigation entre projets */
.project-nav {
  display: flex;
  gap: 1.5rem;
  margin-top: 3.5rem;
}

.nav-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
}

.nav-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

.nav-card.next {
  text-align: right;
}

.nav-dir {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.55;
  color: var(--color-text);
}

.nav-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-heading-grad-from);
}

.nav-spacer {
  flex: 1;
}

.back-wrapper {
  margin-top: 2rem;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.9rem;
  color: #ffffff;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
  .project-shell {
    padding: 1.8rem 0.5rem 4rem;
  }

  .grid-2col {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .project-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-card.next {
    text-align: left;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
