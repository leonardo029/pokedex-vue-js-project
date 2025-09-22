<template>
  <div class="d-flex flex-column ga-10 pt-10 pb-4">

    <div class="d-flex justify-end">
      <v-menu
        location="bottom end"
        offset-y
        max-width="200"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            outlined      
            rounded="lg"  
            elevation="0"
            style="width: 50px; height: 50px;"  
          >
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </template>

        <v-card
          color="primary"
          dark
          class="scrollable-menu"
          style="max-height: 300px; overflow-y: auto;"
        >
          <v-list density="compact" bg-color="primary">
            <v-list-item
              v-for="type in typesList"
              :key="type"
              @click="infoPokemonStore.setFilterType(type)"
            >
              <v-list-item-title class="text-white">{{ type }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item @click="infoPokemonStore.setFilterType('')">
              <v-list-item-title class="text-white">All Types</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

      </v-menu>
    </div>

    <v-row class="flex-grow-1">
      <v-row class="flex-grow-1">

        <template v-if="loading">
          <v-col v-for="n in limit" :key="n" cols="3">
            <v-card class="pa-6 d-flex flex-column align-center justify-center" height="405" rounded>
              <v-progress-circular
                indeterminate
                color="blue"
                size="50"
              />
            </v-card>
          </v-col>
        </template>

        <template v-else>
          <v-col
            v-for="pokemon in infoPokemonStore.listInfoPokemon"
            :key="pokemon.id"
            cols="3"
          >
            <v-card 
              class="pa-6 d-flex flex-column align-center" 
              rounded 
              @click="!loading && goToDetail(pokemon)">

              <div class="d-flex align-center justify-center" style="height: 250px; width: 250px;">
                <v-img
                  v-if="pokemon.official_artwork.front_default"
                  :src="pokemon.official_artwork.front_default"
                  width="250"
                  height="250"
                  class="rounded"
                  aspect-ratio="1"
                  cover
                >
                </v-img>

                <div v-else>
                  <h3 class="text-primary">Image not available</h3>
                </div>
              </div>

              <v-card-subtitle class="mt-1">ID: {{ formatPokemonId(pokemon.id) }}</v-card-subtitle>
              <v-card-title>{{ formatWord(pokemon.name) }}</v-card-title>
              <v-card-subtitle class="mt-2">
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
              </v-card-subtitle>

            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-row>

    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="5"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<style scoped>
.scrollable-menu::-webkit-scrollbar {
  width: 8px;
}

.scrollable-menu::-webkit-scrollbar-thumb {
  background-color: #1976d2;
  border-radius: 4px;
}

.scrollable-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

</style>

<script lang="ts">
import { useListInfoPokemonStore } from '@/stores/useListInfoPokemonStore';
import { formatWord, formatPokemonId } from '@/utils/format';
import type { IInfoPokemon } from '@/interfaces';
import { getTypeColor } from '@/utils/color';

export default {
  name: 'PokemonGrid',

  data() {
    return {
      infoPokemonStore: useListInfoPokemonStore(),
      typesList: ['fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'flying'],
      limit: 24,
    }
  },

  computed: {
    loading() {
      return this.infoPokemonStore.loading
    },
    page: {
      get() {
        return this.infoPokemonStore.page
      },
      set(value: number) {
        this.infoPokemonStore.page = value
      }
    },
    totalPages(): number {
      return Math.ceil(this.infoPokemonStore.totalCount / this.limit);
    }
  },

  methods: {
    formatWord,
    getTypeColor,
    formatPokemonId,
    goToDetail(pokemon: IInfoPokemon) {
      this.$router.push({ path: `/pokemon/${pokemon.id}` })
    }
  },

  watch: {
    page(newPage: number) {
      this.infoPokemonStore.fetchPage(newPage, this.limit);
    }
  },

  mounted() {
    this.infoPokemonStore.fetchPage(this.page, this.limit);
  }

}
</script>
