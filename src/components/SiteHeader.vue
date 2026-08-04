<template>
  <header class="site-header">
    <div class="container">
      <RouterLink class="brand" to="/" @click="closeMenu">
        <img src="/src/assets/logo.png" alt="logo" />
      </RouterLink>

      <!-- Bouton Menu Burger visible uniquement sur mobile (< 768px) -->
      <button 
        class="mobile-toggle" 
        :class="{ active: isMenuOpen }" 
        @click="toggleMenu" 
        aria-label="Menu de navigation"
        :aria-expanded="isMenuOpen"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <!-- Navigation principale (bureau & tiroir mobile) -->
      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <a href="#home" @click.prevent="goTo('#home')">Accueil</a>
        <a href="#projects" @click.prevent="goTo('#projects')">Projets</a>
        <a href="#about" @click.prevent="goTo('#about')">À propos</a>
        <a href="#contact" @click.prevent="goTo('#contact')">Contact</a>
      </nav>
    </div>

    <!-- Overlay sombre en arrière-plan lorsque le menu mobile est ouvert -->
    <div 
      v-if="isMenuOpen" 
      class="nav-backdrop" 
      @click="closeMenu"
    ></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

/**
 * État réactif contrôlant l'ouverture et la fermeture du menu mobile.
 * true = menu ouvert / false = menu fermé
 */
const isMenuOpen = ref(false)

/**
 * Bascule l'état d'ouverture du menu mobile burger.
 * Inverse la valeur courante de isMenuOpen.
 */
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

/**
 * Ferme explicitement le menu mobile burger.
 * Utile lors du clic sur un lien de navigation ou sur le backdrop.
 */
function closeMenu() {
  isMenuOpen.value = false
}

/**
 * Gère la navigation vers une section (ancrage avec hash) ou vers la page d'accueil.
 * Si l'utilisateur est déjà sur l'accueil ('/'), effectue un défilement doux (smooth scroll).
 * Si l'utilisateur est sur une autre vue, redirige d'abord vers '/' avec l'ancre demandée.
 * 
 * @param {string} hash - L'identifiant de la section cible (ex: '#home', '#projects')
 */
async function goTo(hash) {
  // Ferme le menu mobile pour laisser voir le contenu vers lequel l'utilisateur navigue
  closeMenu()

  if (route.path !== '/') {
    // Si l'utilisateur est sur une sous-page (ex: détail projet), redirection vers la page d'accueil
    await router.push({ path: '/', hash })
  } else {
    // Si l'utilisateur est déjà sur la page d'accueil, scroll fluide vers la section ciblée
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // Met à jour l'URL sans recharger la page
    history.replaceState(null, '', hash)
  }
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(3,15,26,0.85), rgba(3,15,26,0.6));
  border-bottom: 1px solid rgba(255,255,255,0.05);
  z-index: 60;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.6px;
  font-size: var(--step-1);
  text-decoration: none;
  color: var(--color-text);
  z-index: 70;
}

.brand img {
  height: 52px;
  width: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.brand:hover img {
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .brand img {
    height: 40px;
  }
}

.nav-menu {
  display: flex;
  align-items: center;
}

.nav-menu a {
  color: var(--color-text);
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: var(--step-0);
  line-height: 1;
  position: relative;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.nav-menu a:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, var(--color-heading-grad-from), var(--color-heading-grad-to));
  transition: width 0.35s ease;
}

.nav-menu a:hover:after {
  width: 100%;
}

.nav-menu a:hover {
  opacity: 0.9;
}

/* Bouton Burger (Masqué par défaut sur grand écran) */
.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 70;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
}

.mobile-toggle .bar {
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Transformation de l'icône burger en croix quand ouvert */
.mobile-toggle.active .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.mobile-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Overlay sombre de fond pour le menu mobile */
.nav-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 55;
}

/* Styles responsives pour mobiles (< 768px) */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 260px;
    height: 100vh;
    background: rgba(3, 15, 26, 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    flex-direction: column;
    align-items: flex-start;
    padding: 6rem 2rem 2rem;
    gap: 1.8rem;
    transform: translateX(100%);
    visibility: hidden;
    pointer-events: none;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.35s ease;
    z-index: 65;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }

  .nav-menu.is-open {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
  }

  .nav-menu a {
    margin-left: 0;
    font-size: 1.25rem;
    width: 100%;
    padding: 0.4rem 0;
  }
}

@media (min-width: 900px) {
  .brand {
    font-size: var(--step-2);
  }

  .nav-menu a {
    font-size: calc(var(--step-0) * 1.02);
  }
}
</style>
