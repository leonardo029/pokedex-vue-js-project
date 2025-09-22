import type { IDamageRelations, IInfoPokemon } from '@/interfaces';
import { getInfoPokemon, getInfoType } from '@/services';
import { defineStore } from 'pinia';
import { useAllNamesPokemonStore } from './useAllNamesPokemonStore';

export const useListInfoPokemonStore = defineStore('ListInfoPokemon', {
  state: () => ({
    listInfoPokemon: [] as IInfoPokemon[],
    page: 1,
    totalCount: 0,
    loading: false,
    error: null as string | null,
    filterType: '' as string,
  }),

  actions: {
    async getInfoPokemon(){

      const allNamesPokemonStore = useAllNamesPokemonStore();
      const listNamesPokemon = allNamesPokemonStore.namesPagePokemon?.results;
      
      this.error = null;

      try {
          const responseData = await Promise.all(
            listNamesPokemon!.map(pokemon =>  getInfoPokemon({ nameOrIdPokemon: pokemon.name }))
          );
          this.listInfoPokemon = responseData;
      } catch (error) {
        console.error('Error to search the pokemon:', error);
        this.error = 'Error to search the pokemon';
      } 
    },

    async getInfoPokemonByNameOrId( { nameOrId } :{ nameOrId: string }){
      
      this.error = null;

      try {
        const responseData = await getInfoPokemon({ nameOrIdPokemon: nameOrId });
        return responseData;
      } catch (error) {
        console.error('Error to search the pokemon:', error);
        this.error = 'Error to search the pokemon';
      }
    },

    async fetchPage(page: number, limit: number) {
      const allNamesPokemonStore = useAllNamesPokemonStore();
      this.loading = true;
      this.error = null;

      try {
        let listNamesPokemon;

        if (!this.filterType) {
          const offset = (page - 1) * limit;
          await allNamesPokemonStore.fetchAllNamesPage({ limit, offset });
          listNamesPokemon = allNamesPokemonStore.namesPagePokemon?.results;

          this.totalCount = allNamesPokemonStore.namesPagePokemon?.count ?? 0;
        } else {
          const typeData: IDamageRelations = await getInfoType({ type: this.filterType });

          const allPokemonOfType = typeData.pokemon.map((p) => p.pokemon);

          this.totalCount = allPokemonOfType.length;

          const start = (page - 1) * limit;
          const end = start + limit;
          listNamesPokemon = allPokemonOfType.slice(start, end);
        }

        if (!listNamesPokemon) {
          this.listInfoPokemon = [];
          return;
        }

        const responseData = await Promise.all(
          listNamesPokemon.map((p: { name: string }) =>
            getInfoPokemon({ nameOrIdPokemon: p.name })
          )
        );

        this.listInfoPokemon = responseData;
        this.page = page;
      } catch (error) {
        console.error("Error fetching pokemons:", error);
        this.error = "Error fetching pokemons";
      } finally {
        this.loading = false;
      }
    },

    setFilterType(type: string) {
      this.filterType = type;
      this.page = 1;
      this.fetchPage(this.page, 24);
    }

  },
})
