<template>
  <div v-if="infoPokemonStore.evolutionChain" class="d-flex flex-row align-center ga-6 justify-center">
    <EvolutionNode :chain="infoPokemonStore.evolutionChain.chain" />
  </div>

  <div v-else class="d-flex justify-center py-6">
    <v-progress-circular indeterminate color="blue" size="50" />
  </div>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore'

export default {
  name: 'PokemonEvolutionChain',

  data() {
    return {
      infoPokemonStore: useInfoPokemonStore()
    }
  }
}
</script>
