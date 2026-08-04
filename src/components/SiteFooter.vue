<template>
  <footer class="site-footer">
    <div class="container">
      <div class="copyright">© {{ year }} Yoan Fleuret — Concepteur Développeur d'Applications</div>
      <div class="links">
        <a href="https://github.com/Yxampo" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/yoan-fleuret/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a :href="cvPdfUrl" download="cv_yoan_fleuret.pdf" target="_blank">CV</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import cvPdfUrl from '../assets/pdf/cv_yoan_fleuret.pdf'

/**
 * Année courante dynamique calculée pour le copyright du pied de page.
 */
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  margin-top: 3rem;
}

.site-footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.site-footer a {
  color: var(--color-text);
  margin-left: 1rem;
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.site-footer a:hover {
  opacity: 1;
}

.copyright {
  font-size: 0.88rem;
  opacity: 0.7;
}

@media (max-width: 576px) {
  .site-footer .container {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }

  .site-footer a {
    margin: 0 0.5rem;
  }
}
</style>
