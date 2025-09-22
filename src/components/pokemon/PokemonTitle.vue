<template>
  <div v-if="pokemon" class="text-center bg-grey-darken-4 py-4">
    <h1 class="text-h2 font-weight-bold">
      {{ formatWord(pokemon.name) }}
    </h1>
    <p class="text-h5 text-medium-emphasis">
      #{{ formatPokemonId(pokemon.id) }}
    </p>
  </div>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore';
import { formatWord, formatPokemonId } from '@/utils/format';

  export default {
    name: 'PokemonTitle',

    data() {
      return {
        infoPokemonStore: useInfoPokemonStore()
      }
    },

    computed: {
      pokemon() {
        return this.infoPokemonStore.pokemon;
      }
    },
    
    methods: {
      formatWord,
      formatPokemonId
    },
  }

</script>