<template>
  <div v-if="loading" class="d-flex justify-center py-6">
    <v-progress-circular indeterminate color="blue" size="50" />
  </div>

  <div v-if="!loading" class="d-flex flex-row align-center ga-6 justify-center">
    <EvolutionNode v-if="infoPokemonStore.evolutionChain"
      :chain="infoPokemonStore.evolutionChain.chain"
    />
    <h3 v-else class="text-primary d-flex justify-center my-4">
      Has no evolution chain
    </h3>
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
  },

  computed: {
    loading() {
      return this.infoPokemonStore.loading
    },
  }
}
</script>
