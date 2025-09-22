<template>
  <div
    class="d-flex align-center justify-center"
    style="height: 550px;"
  >
    <div class="d-flex flex-column align-center ga-4" style="max-width: 800px;">
      <v-img
        :src="image_src"
        height="170"
        width="250"
        contain
      />
      <div class="d-flex flex-column align-center text-center">
        <h1 class="text-primary font-weight-bold mb-2">
          {{ infoPokemonStore.error }}
        </h1>
        <p class="text-grey text-subtitle-1">
          The Pokémon you searched for was not found.
        </p>

        <v-btn
          color="primary"
          class="mt-6"
          rounded
          @click="$router.push('/')"
        >
          Return to Home
        </v-btn>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore';

export default {
  name: 'PokemonSearchError',

  data() {
    return {
      infoPokemonStore: useInfoPokemonStore(),
      image_src: '/img/PokemonError.png'
    }
  }
}
</script>
