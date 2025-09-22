<template>
  <div class="d-flex flex-row align-center ga-8">

    <div v-if="pokemonData" class="d-flex flex-column align-center">
      <img
        :src="pokemonData?.official_artwork.front_default"
        :alt="pokemonData?.name"
        width="170"
        class="rounded"
      />
      <h1 class="text-h5 font-weight-bold">
        {{ formatWord(pokemonData.name) }}
      </h1>
      <p class="text-subtitle-2 text-grey-darken-3">
        #{{ formatPokemonId(pokemonData.id) }}
      </p>
    </div>

    <template v-if="chain.evolves_to.length">
      <div class="d-flex align-center">
        <v-icon icon="mdi-chevron-right" size="x-large" />
      </div>

      <div
        v-if="chain.evolves_to.length > 1"
        class="d-flex flex-wrap ga-6"
        style="max-width: 800px;"
      >
        <div
          v-for="(evo, index) in chain.evolves_to"
          :key="index"
          class="d-flex justify-center"
          style="flex: 1 0 21%; max-width: 21%;"
        >
          <EvolutionNode :chain="evo" />
        </div>
      </div>

      <div
        v-else
        class="d-flex flex-row align-center ga-16"
      >
        <EvolutionNode :chain="chain.evolves_to[0]" />
      </div>
    </template>

  </div>
</template>


<script lang="ts">
import { useListInfoPokemonStore } from '@/stores/useListInfoPokemonStore'
import type { Chain, IInfoPokemon } from '@/interfaces'
import type { PropType } from 'vue'
import { formatWord, formatPokemonId } from '@/utils/format'

export default {
  name: 'EvolutionNode',

  props: {
    chain: {
      type: Object as PropType<Chain>,
      required: true
    }
  },

  data() {
    return {
      pokemonData: null as IInfoPokemon | null
    }
  },

  methods: {
    formatWord,
    formatPokemonId,
    async checkPokemonExistence() {
      const listInfoPokemonStore = useListInfoPokemonStore();
      const namePokemon = this.chain.species.name;

      const found = listInfoPokemonStore.listInfoPokemon.find(p => p.name === namePokemon);

      if (found) {
        this.pokemonData = found;
      } else {
        this.pokemonData = (await listInfoPokemonStore.getInfoPokemonByNameOrId({ nameOrId: namePokemon })) ?? null;
      }
    }
  },

  async mounted() {
    await this.checkPokemonExistence();
  }
}
</script>
