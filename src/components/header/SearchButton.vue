<template>
  <v-autocomplete
    class="mr-5"
    v-model="selectedPokemon"
    :items="listNamesPokemon"
    v-model:search="searchText"
    density="compact"
    menu-icon=""
    placeholder="Search..."
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    auto-select-first
    rounded="xl"
    width="250"
    item-title="title"
    item-value="value"
    @update:model-value="goToDetail"
    @keydown.enter.prevent="handleEnter"
  />
</template>

<script lang="ts">
import { useAllNamesPokemonStore } from '@/stores/useAllNamesPokemonStore';
import { formatWord } from '@/utils/format';

export default {
  name: 'SearchButton',

  data() {
    return {
      selectedPokemon: null as string | null,
      searchText: '' as string,
    };
  },

  methods: {
    formatWord,

    handleEnter() {
      if (this.selectedPokemon) {
        this.goToDetail(this.selectedPokemon);
        return;
      }

      if (this.searchText.trim().length > 0) {
        this.goToDetail(this.searchText.trim().toLowerCase());
      }
    },

    goToDetail(pokemonNameOrId: string) {
      this.$router.push({
        path: `/pokemon/${pokemonNameOrId}`,
      });
      this.selectedPokemon = null;
      this.searchText = '';
    },
  },

  computed: {
    listNamesPokemon() {
      const allNamesStore = useAllNamesPokemonStore();
      return (
        allNamesStore.allNamesPokemon?.results.map((p) => ({
          title: formatWord(p.name),
          value: p.name,
        })) || []
      );
    },
  },

  created() {
    const allNamesStore = useAllNamesPokemonStore();
    allNamesStore.fetchAllNames();
  }

};
</script>
