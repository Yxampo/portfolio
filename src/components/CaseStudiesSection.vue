<template>
  <section id="projects" class="case-section" ref="root">
    <header class="section-head">
      <span class="sub-badge">Portfolio & Réalisations</span>
      <h2 class="gradient-title">Mes Projets Majeurs</h2>
    </header>

    <div class="cases">
      <RouterLink :to="'/' + c.id" v-for="c in cases" :key="c.id" class="case" :ref="el => collectCaseEl(el)">
        <div class="case-media">
          <img :src="c.cover" :alt="'Couverture projet ' + c.title" loading="lazy" />
          <div class="media-overlay">
            <span class="view-btn">Découvrir le projet →</span>
          </div>
        </div>
        <div class="case-body">
          <div class="badge-line" v-if="c.type">
            <span class="project-badge" :class="c.type">
              {{ c.type === 'cda' ? 'Titre RNCP CDA' : (c.type === 'internship' ? 'Stage' : 'Projet Web') }}
            </span>
          </div>
          <h3>{{ c.title }}</h3>
          <p class="muted">{{ c.description }}</p>
          <ul class="meta">
            <li v-for="t in c.tags" :key="t">{{ t }}</li>
          </ul>
          <span class="link-arrow">Voir le projet complet <span class="arrow">→</span></span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGsapFadeStagger } from '../composables/useGsapReveal'
import { projects as fullProjects } from '../data/projects'

// Référence pour l'élément HTML racine de la section
const root = ref(null)

// Tableau réactif accumulant les références des cartes de projets pour l'animation GSAP
const caseEls = ref([])

/**
 * Collecte chaque élément DOM de projet lors du rendu du v-for
 * afin d'appliquer l'animation en cascade GSAP.
 * 
 * @param {Element|ComponentProxy} el - L'élément DOM ou le proxy de composant Vue
 */
function collectCaseEl(el) {
  if (el) caseEls.value.push(el)
}

// Importation dynamique de toutes les images du projet depuis le dossier d'actifs
const assetsMap = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })

/**
 * Normalise une chaîne de caractères pour faciliter la recherche d'images (retire les accents, espaces et majuscules).
 * 
 * @param {string} str - La chaîne à normaliser (ex: "Premium VTC")
 * @returns {string} - La chaîne normalisée (ex: "premium-vtc")
 */
function normalize(str) {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/prenium/g, 'premium')
}

// Image par défaut si aucune illustration n'est trouvée
const placeholder = '/placeholder.svg'

/**
 * Propriété calculée générant la liste ordonnée des projets avec leurs images et leurs tags.
 */
const cases = computed(() => {
  return fullProjects.map(p => {
    const slug = normalize(p.slug)
    const title = normalize(p.title)
    
    // Filtre et associe les images correspondantes dans les actifs
    const matches = Object.entries(assetsMap)
      .filter(([path]) => {
        const low = path.toLowerCase()
        const normPath = low.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s_]+/g, '-')
        return low.includes(slug) || low.includes(title) || normPath.includes(slug) || normPath.includes(title) || (slug.includes('assistant') && low.includes('assistant'))
      })
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(([, url]) => url)
      
    const cover = matches.find(u => typeof u === 'string') || 
                  (Array.isArray(p.gallery) ? p.gallery.find(u => typeof u === 'string' && !u.includes('placeholder')) : undefined) || 
                  placeholder
                  
    const tags = p.stack || []
    return { id: p.slug, title: p.title, cover, description: p.description || p.tagline || '', tags, type: p.projectType }
  })
})

/**
 * Au montage du composant, déclenche l'animation d'apparition en fondu progressif sur chaque carte de projet.
 */
onMounted(() => {
  useGsapFadeStagger(caseEls.value)
})
</script>

<style scoped>
.case-section {
  padding: 6rem 0 5rem;
}

.section-head {
  margin-bottom: 3rem;
}

.sub-badge {
  display: inline-block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}

.cases {
  display: grid;
  gap: 4rem;
}

.case {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 1.5rem;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.case:hover {
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.case-media {
  position: relative;
  aspect-ratio: 16/9;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
  border-radius: 14px;
}

.case-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(3, 15, 26, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-btn {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
}

.case:hover .case-media img {
  transform: scale(1.04);
}

.case:hover .media-overlay {
  opacity: 1;
}

.case-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge-line {
  margin-bottom: 0.6rem;
}

.project-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-heading-grad-from);
}

.project-badge.cda {
  background: linear-gradient(90deg, rgba(181, 223, 202, 0.15), rgba(219, 145, 210, 0.15));
  border-color: rgba(219, 145, 210, 0.3);
}

.case-body h3 {
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2.2rem);
  margin: 0 0 0.6rem;
  line-height: 1.1;
  color: #ffffff;
}

.meta {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.65rem;
  padding: 0;
  margin: 1.2rem 0 1.4rem;
}

.meta li {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.35rem 0.75rem;
  border-radius: 30px;
  font-size: 0.72rem;
  letter-spacing: 0.4px;
}

.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading-grad-from);
  margin-top: auto;
}

.arrow {
  transition: transform 0.2s ease;
}

.case:hover .arrow {
  transform: translateX(4px);
}

@media (min-width: 860px) {
  .cases {
    gap: 3.5rem;
  }
  .case {
    grid-template-columns: 52% 1fr;
    align-items: stretch;
    padding: 2rem;
    gap: 2.2rem;
  }
  .case:nth-child(even) {
    grid-template-columns: 1fr 52%;
  }
  .case:nth-child(even) .case-media {
    order: 2;
  }
}

@media (max-width: 768px) {
  .case-section {
    padding: 3.5rem 0 3rem;
  }
  .section-head {
    margin-bottom: 1.8rem;
  }
  .cases {
    gap: 2rem;
  }
  .case {
    padding: 1.2rem;
  }
}
</style>
