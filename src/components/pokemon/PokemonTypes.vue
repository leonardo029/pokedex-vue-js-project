<template>
  <div class="d-flex ga-2">
    <span
      v-for="t in pokemon?.types"
      :key="t.slot"
      class="px-2 py-1 rounded text-white"
      :style="{ backgroundColor: getTypeColor(t.type.name) }"
    >
      {{ t.type.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore';
import { getTypeColor } from '@/utils/color';

    export default {
    name: 'PokemonTypes',

    data() {
      return {
        infoPokemonStore: useInfoPokemonStore(),
      }
    },

    computed: {
      pokemon() {
        return this.infoPokemonStore.pokemon;
      },
    },

    methods:{
      getTypeColor,
    }
  }
</script>