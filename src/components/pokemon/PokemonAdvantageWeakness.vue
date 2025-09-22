<template>
  <div class="d-flex flex-column ga-5">
    <div v-if="infoPokemonStore.loading" class="d-flex justify-center">
      <v-progress-circular
        indeterminate
        color="blue"
        size="50"
      />
    </div>

    <template v-else>
      <div class="d-flex flex-column ga-2">
        <h3 class="text-h5 font-weight-regular text-black">Advantages:</h3>
        <div class="d-flex ga-2 ml-4 mt-1 flex-wrap">
          <template v-if="infoPokemonStore.advantages.length">
            <span
              v-for="advantage in infoPokemonStore.advantages"
              :key="advantage"
              class="px-2 py-1 rounded text-white"
              :style="{ backgroundColor: getTypeColor(advantage) }"
            >
              {{ advantage }}
            </span>
          </template>
          <template v-else>
            <h4 class="text-primary">Advantages not found</h4>
          </template>
        </div>
      </div>

      <div class="d-flex flex-column ga-2">
        <h3 class="text-h5 font-weight-regular text-black">Weaknesses:</h3>
        <div class="d-flex ga-2 ml-4 mt-1 flex-wrap">
          <template v-if="infoPokemonStore.weaknesses.length">
            <span
              v-for="weakness in infoPokemonStore.weaknesses"
              :key="weakness"
              class="px-2 py-1 rounded text-white"
              :style="{ backgroundColor: getTypeColor(weakness) }"
            >
              {{ weakness }}
            </span>
          </template>
          <template v-else>
            <h4 class="text-primary">Weaknesses not found</h4>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore'
import { getTypeColor } from '@/utils/color'

export default {
  name: 'PokemonAdvantageWeakness',

  data() {
    return {
      infoPokemonStore: useInfoPokemonStore()
    }
  },

  methods: {
    getTypeColor
  }
}
</script>
