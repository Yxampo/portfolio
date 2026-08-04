<template>
  <div class="lightbox" @keydown.esc.prevent="close" tabindex="0" ref="root">
    <div class="overlay" @click="close" />
    <div class="dialog" ref="dialog">
      <button class="close" @click="close" aria-label="Fermer">×</button>
      <div class="image-wrapper">
        <img :src="images[index]" :alt="'Image ' + (index+1)" />
      </div>
      <div class="controls">
        <button @click="prev" :disabled="index === 0" aria-label="Image précédente">Précédent</button>
        <span>{{ index + 1 }} / {{ images.length }}</span>
        <button @click="next" :disabled="index === images.length - 1" aria-label="Image suivante">Suivant</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  index: { type: Number, default: 0 }
})

const emits = defineEmits(['close'])

const root = ref(null)
const dialog = ref(null)

// Index d'image actif réactif
const index = ref(props.index || 0)

// Écouteur de changement d'index depuis la prop parente
watch(() => props.index, (v) => {
  index.value = v
})

/**
 * Émet l'événement de fermeture de la lightbox au composant parent.
 */
function close() {
  emits('close')
}

/**
 * Navigue vers l'image précédente si nous ne sommes pas à la première image.
 */
function prev() {
  if (index.value > 0) {
    index.value--
  }
}

/**
 * Navigue vers l'image suivante si nous ne sommes pas à la dernière image.
 */
function next() {
  if (index.value < props.images.length - 1) {
    index.value++
  }
}

/**
 * Donne le focus clavier au conteneur principal lors de l'ouverture pour intercepter la touche Echap.
 */
onMounted(() => {
  if (root.value) {
    root.value.focus()
  }
})
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dialog {
  position: relative;
  max-width: 1000px;
  width: 92%;
  background: #0b1621;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 210;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.image-wrapper {
  max-height: 70vh;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.close {
  position: absolute;
  top: 10px;
  right: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.4rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}

.controls button {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 0;
  padding: 0.6rem 1.1rem;
  min-height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s ease;
}

.controls button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.16);
}

.controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 576px) {
  .dialog {
    width: 95%;
    padding: 1rem 0.75rem;
  }
}
</style>
