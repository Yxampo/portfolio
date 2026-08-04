import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fonction d'animation d'apparition progressive (fade & slide-up) pour les titres et conteneurs textuels.
 * Inclut des garde-fous (once: true et ScrollTrigger.refresh()) pour éviter de bloquer le défilement jusqu'au pied de page.
 * 
 * @param {Element} el - L'élément DOM racine à animer
 */
export function useGsapReveal(el) {
  if (!el) return

  // Rafraîchit les positions calculées par GSAP après le rendu du DOM et le chargement des images
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })

  const targets = el.querySelectorAll('h1, h2, h3, p, li, .status-badge, .hero-actions')
  if (!targets.length) return

  gsap.from(targets, {
    opacity: 0,
    y: 35,
    stagger: 0.08,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    }
  })
}

/**
 * Fonction d'animation en cascade (stagger) pour les cartes de projets et éléments de grille.
 * 
 * @param {Array<Element|ComponentProxy>} elements - Tableau d'éléments DOM à animer au défilement
 */
export function useGsapFadeStagger(elements) {
  if (!elements || !elements.length) return

  const valid = elements
    .map(el => (el && el.$el ? el.$el : el))
    .filter(el => el instanceof Element)

  if (!valid.length) return

  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })

  valid.forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    })
  })
}
