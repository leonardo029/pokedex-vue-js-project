<template>

  <div v-if="infoPokemonStore.loading" class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate color="blue" size="70" />
  </div>

  <div v-else-if="infoPokemonStore.error">
    <PokemonSearchError/>
  </div>

  <div v-else-if="infoPokemonStore.pokemon" class="d-flex flex-column py-8 ga-2">
    <PokemonTitle/>
    <PokemonInfos/>
  </div>
  
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore';
import { useListInfoPokemonStore } from '@/stores/useListInfoPokemonStore';

export default {
  name: 'InfoPokemonByNameOrId',
  
  data() {
    return {
      infoPokemonStore: useInfoPokemonStore(),
      listInfoPokemonStore: useListInfoPokemonStore()
    }
  },

  methods: {
    async loadPokemon(nameOrId: string) {
      await this.infoPokemonStore.setPokemon(nameOrId, this.listInfoPokemonStore.listInfoPokemon);
    }
  },

  async created() {
    const id = (this.$route.params as { id: string }).id;
    await this.loadPokemon(id);
  },

  watch: {
    '$route.params.id'(newId: string) {
      this.loadPokemon(newId);
    }
  }
}

</script>