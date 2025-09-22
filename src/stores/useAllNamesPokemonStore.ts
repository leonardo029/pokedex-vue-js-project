import { defineStore } from 'pinia';
import { fetchAllPokemonNames } from '@/services/home/getAllPokemon';
import type { IAllNamesPokemon } from '@/interfaces';

export const useAllNamesPokemonStore = defineStore('allNamesPokemon', {
  state: () => ({
    allNamesPokemon: null as IAllNamesPokemon | null,
    namesPagePokemon:  null as IAllNamesPokemon | null,
    hasBeenFetched: false,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAllNamesPage({ limit, offset } : { limit:number; offset:number }){

      this.error = null;
      
      try {
        const responseData = await fetchAllPokemonNames({ limit: limit, offset:offset});
        this.namesPagePokemon = responseData;
      } catch (error) {
        console.error('Error to search all pokemons:', error);
        this.error = 'Error to search all pokemons';
      }
    },

    async fetchAllNames(){
      if (this.hasBeenFetched || this.loading) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const responseData = await fetchAllPokemonNames({limit: 2000});
        this.allNamesPokemon = responseData;
        this.hasBeenFetched = true;
      } catch (error) {
        console.error('Error to fetch all pokemons:', error);
        this.error = 'Error to fetch all pokemons';
      } finally {
        this.loading = false;
      }
    }
  },
})
