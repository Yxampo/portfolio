<template>
  <section id="contact" class="contact-section" ref="root">
    <div class="inner">
      <header class="contact-head">
        <span class="sub-label">Contact & Opportunités</span>
        <h2 class="gradient-title">Travaillons ensemble</h2>
        <p class="tag">Un projet, une opportunité ou une collaboration ? N'hésitez pas à me contacter pour échanger sur vos besoins en développement web et mobile.</p>
      </header>
      <div class="contact-grid">
        <div class="contact-main">
          <p class="cta-text">Disponible pour des opportunités en développement fullstack.</p>
          <div class="actions">
            <a class="contact-btn primary" href="mailto:yoanfleuret10@gmail.com">
              Écrire un email
            </a>
            <a class="contact-btn alt" :href="cvPdfUrl" download="cv_yoan_fleuret.pdf" target="_blank">
              Télécharger mon CV 
            </a>
          </div>
        </div>
        <div class="contact-side">
          <ul class="info">
            <li>
              <span class="label">Email</span>
              <a href="mailto:yoanfleuret10@gmail.com" class="email-link">yoanfleuret10@gmail.com</a>
            </li>
            <li>
              <span class="label">Qualifications</span>
              <span>Concepteur Développeur d'Applications (RNCP 6)</span>
            </li>
            <li>
              <span class="label">Localisation</span>
              <span>Paris</span>
            </li>
          </ul>
          <div class="socials">
            <a href="https://github.com/Yxampo" target="_blank" rel="noopener noreferrer" aria-label="GitHub Yoan Fleuret" class="social-pill">
              GitHub 
            </a>
            <a href="https://www.linkedin.com/in/yoan-fleuret/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Yoan Fleuret" class="social-pill">
              LinkedIn 
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'
import cvPdfUrl from '../assets/pdf/cv_yoan_fleuret.pdf'

// Référence pour l'élément HTML racine de la section Contact
const root = ref(null)

/**
 * Hook au montage du composant.
 * Initialise l'animation GSAP au défilement sur les titres et textes de la section contact.
 */
onMounted(() => {
  useGsapReveal(root.value)
})
</script>

<style scoped>
.contact-section {
  padding: 8rem 0 9rem;
  position: relative;
}

.inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-head {
  max-width: 900px;
  margin: 0 0 3.5rem;
}

.contact-head h2 {
  margin: 0 0 1.2rem;
  font-size: clamp(2.2rem, 1.8rem + 2.5vw, 4.2rem);
}

.tag {
  font-size: clamp(1rem, 0.95rem + 0.5vw, 1.35rem);
  line-height: 1.55;
  opacity: 0.8;
}

.contact-grid {
  display: grid;
  gap: 3rem;
}

.cta-text {
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.25rem);
  line-height: 1.6;
  margin: 0 0 2rem;
  opacity: 0.85;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.2rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.8rem;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 46px;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.6px;
  backdrop-filter: blur(6px);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.contact-btn.primary {
  background: linear-gradient(90deg, var(--color-heading-grad-from), var(--color-heading-grad-to));
  color: #030F1A;
  font-weight: 600;
  border: none;
}

.contact-btn.alt {
  background: rgba(255,255,255,0.07);
}

.contact-btn:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.2rem;
  font-size: 0.9rem;
}

.info .label {
  display: block;
  font-size: 0.65rem;
  opacity: 0.55;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.email-link {
  color: var(--color-text);
  word-break: break-all;
  overflow-wrap: anywhere;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.social-pill {
  display: inline-block;
  padding: 0.55rem 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.6px;
  background: rgba(255,255,255,0.08);
  border-radius: 32px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.2s ease;
}

.social-pill:hover {
  background: rgba(255,255,255,0.14);
}

@media (min-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
  .contact-head {
    margin-bottom: 4.5rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 0 4rem;
  }

  .inner {
    padding: 0 0.5rem;
  }

  .contact-grid {
    gap: 2.2rem;
  }

  .actions {
    flex-direction: column;
  }

  .contact-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
