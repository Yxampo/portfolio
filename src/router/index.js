import { createRouter, createWebHistory } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import HomeView from '../views/HomeView.vue'
import AssistantFamilialView from '../views/AssistantFamilialView.vue'
import PremiumVtcView from '../views/PremiumVtcView.vue'
import MakaraView from '../views/MakaraView.vue'
import LamarcheView from '../views/LamarcheView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/assistant-familial', name: 'assistant-familial', component: AssistantFamilialView },
    { path: '/premium-vtc', name: 'premium-vtc', component: PremiumVtcView },
    { path: '/makara', name: 'makara', component: MakaraView },
    { path: '/lamarche', name: 'lamarche', component: LamarcheView }
  ],

  /**
   * Gestionnaire de comportement du défilement lors des changements de routes ou de hash.
   * 
   * @param {Object} to - Route cible
   * @param {Object} from - Route d'origine
   * @param {Object|null} savedPosition - Position sauvegardée lors du retour navigateur
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            resolve({ el: to.hash })
          } else {
            resolve({ top: 0 })
          }
        })
      })
    }
    return { top: 0 }
  }
})

/**
 * Guard global de navigation exécuté avant chaque changement de route.
 * Nettoie les animations et ScrollTriggers GSAP en cours pour éviter les fuites mémoire et glitches visuels.
 */
router.beforeEach((to, from, next) => {
  try {
    ScrollTrigger.getAll().forEach(t => t.kill())
    gsap.globalTimeline.clear()
  } catch (e) {
    // Ignore les erreurs éventuelles lors de la réinitialisation GSAP
  }
  next()
})

/**
 * Hook global exécuté après chaque changement de route.
 * Recalcule la hauteur de la page et rafraîchit ScrollTrigger après les transitions pour débloquer le défilement jusqu'au footer.
 */
router.afterEach(() => {
  setTimeout(() => {
    try {
      ScrollTrigger.refresh()
    } catch (e) {
      // Ignore les erreurs éventuelles lors du rafraîchissement GSAP
    }
  }, 300)
})

export default router
