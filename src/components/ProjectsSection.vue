<template>
  <section id="projects" class="section">
    <header class="section-header">
      <h2 class="gradient-title">Projets</h2>
      <p class="muted">Sélection de projets réalisés</p>
    </header>

    <div class="projects-grid">
      <ProjectCard v-for="p in items" :key="p.id" :title="p.title" :short="p.short" :image="p.image" />
    </div>

    <!-- Zone de détail des projets -->
    <div class="details-wrapper">
      <div v-for="p in items" :key="p.id" class="project-detail">
        <h3 class="gradient-title">{{ p.title }}</h3>
        <div class="muted description">{{ p.description }}</div>

        <div class="detail-body">
          <div class="style-box">
            <strong>Style</strong>
            <div class="style-info">
              <div>Typo: {{ p.style?.font }}</div>
              <div>Couleurs:</div>
              <div class="colors-flex">
                <div 
                  v-for="c in (p.style?.colors || [])" 
                  :key="c" 
                  :style="{ background: c }" 
                  class="color-chip"
                ></div>
              </div>
            </div>
          </div>

          <div class="gallery-box">
            <strong>Galerie</strong>
            <div class="gallery-grid">
              <div v-for="(img, i) in p.gallery" :key="i" class="gallery-thumb">
                <img :src="img" :alt="p.title + ' aperçu ' + (i+1)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { projects as fullProjects } from '../data/projects'

// Dictionnaire dynamique d'importation des images dans les actifs
const assetsMap = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })

/**
 * Normalise une chaîne de caractères pour faciliter la recherche de fichiers images.
 * 
 * @param {string} str - Chaîne d'entrée
 * @returns {string} - Chaîne formatée en minuscules sans accents
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

// SVG de placeholder si aucune image n'est trouvée
const dataUrlPlaceholder = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#B5DFCA"/><stop offset="1" stop-color="#DB91D2"/></linearGradient></defs><rect width="100%" height="100%" fill="#0B1622"/><rect x="20" y="20" width="760" height="460" rx="16" fill="url(#g)" opacity="0.15"/></svg>')

/**
 * Fonction utilitaire qui recherche une URL d'image valide non-placeholder dans un tableau.
 * 
 * @param {Array<string>} arr - Tableau d'URLs d'images
 * @returns {string|undefined} - L'URL trouvée ou undefined
 */
const pickImage = (arr) => arr.find(u => typeof u === 'string' && !u.includes('placeholder'))

/**
 * Propriété calculée enrichissant les données des projets avec leurs visuels correspondants.
 */
const items = computed(() => {
  return fullProjects.map(p => {
    const slug = normalize(p.slug)
    const title = normalize(p.title)
    
    // Recherche des fichiers correspondants au slug/titre du projet
    const matches = Object.entries(assetsMap)
      .filter(([path]) => {
        const low = path.toLowerCase()
        const normPath = low.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s_]+/g, '-')
        return low.includes(slug) || low.includes(title) || normPath.includes(slug) || normPath.includes(title)
      })
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(([, url]) => url)
      
    const dataGallery = Array.isArray(p.gallery) ? p.gallery : []
    const gallery = matches.length ? matches : dataGallery
    const image = pickImage(gallery) || pickImage(dataGallery) || dataUrlPlaceholder
    const short = p.tagline || p.description || ''
    
    return { id: p.slug, title: p.title, short, image, description: p.description, style: p.style, gallery }
  })
})
</script>

<style scoped>
.section-header {
  margin-bottom: 2rem;
}

.details-wrapper {
  margin-top: 2.5rem;
  display: grid;
  gap: 1.5rem;
}

.project-detail {
  padding: 1.5rem 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
}

.project-detail h3 {
  margin-bottom: 0.4rem;
}

.description {
  margin-bottom: 1rem;
}

.detail-body {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.style-box {
  min-width: 200px;
  flex: 1;
}

.style-info {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.colors-flex {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.color-chip {
  width: 44px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gallery-box {
  flex: 2;
  min-width: 240px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.gallery-thumb {
  height: 90px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .detail-body {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
