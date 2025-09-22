<template>
  <v-container  v-if="pokemon" class="d-flex flex-column bg-grey-darken-4 rounded mt-5 py-6 ga-5" style="max-width: 1200px; margin: 0 auto;">
    <div class="d-flex flex-row justify-space-between">
      <div>
        <div class="d-flex mt-4">
          <v-btn
            :color="isPokemonInTeam ? 'red' : 'success'"
            rounded
            @click="toggleTeam"
          >
            {{ isPokemonInTeam ? "Remove from Team" : "Add to Team" }}
          </v-btn>
        </div>
        <div class="my-8 mx-8">
          <v-img
            :src="pokemon.official_artwork.front_default"
            width="650"
            height="650"
            class="rounded"
            aspect-ratio="1"
            cover
          >
            <template #placeholder>
              <div class="d-flex justify-center align-center" style="height: 100%;">
                <v-progress-circular indeterminate color="blue" size="50" />
              </div>
            </template>
          </v-img>
        </div>
      </div>
      <div class="d-flex flex-column ga-4">
        <div class="d-flex flex-column bg-grey-lighten-2 rounded py-6 px-6">
          <div >
            <div>
              <div class="d-flex justify-space-around">
                <div>
                  <h3 class="text-subtitle-1 font-weight-regular text-black">Height:</h3>
                  <h4 class="text-h5 font-weight-bold"> {{ decimeterToMeter(pokemon.height) }}</h4>
                </div>
                <div>
                  <h3 class="text-subtitle-1 font-weight-regular text-black">Weight:</h3>
                  <h4 class="text-h5 font-weight-bold">{{ hectogramsToKg(pokemon.weight) }}</h4>
                </div>
                <div>
                  <h3 class="text-subtitle-1 font-weight-regular text-black">Type:</h3>
                    <PokemonTypes />
                </div>
              </div>
            </div>
            <v-divider class="border-opacity-80 my-6"></v-divider>
            <div class="d-flex flex-row align-center">
              <h3 class="text-h5 font-weight-regular text-black mr-4">Abilities: </h3>
              <div class="d-flex ga-4">
                <span
                  v-for="(a, index) in visibleAbilities"
                  :key="index"
                  class="ability-chip rounded px-2 py-1 text-white bg-grey-darken-3"
                >
                  <p class="text-subtitle-2 font-weight-bold">
                    {{ formatWord(a.ability.name) }}</p>
                </span>
              </div>

            </div>
            <v-divider class="border-opacity-80 my-6"></v-divider>
            <h3 class="text-h5 font-weight-regular text-black">Stats Base:</h3>
            <PokemonStatsChart/>
          </div>
        </div>
        <div class="d-flex flex-column bg-grey-lighten-2 rounded py-6 px-6">
          <PokemonAdvantageWeakness/>
        </div>
       </div>
    </div>
    <div class="d-flex flex-column bg-grey-lighten-2 rounded py-6 px-6">
      <h3 class="text-h5 font-weight-regular text-black">Evolution Chain:</h3>
      <PokemonEvolutionChain/>
    </div>
    <PokemonMoves :moves="pokemon.moves"/>
  </v-container>
</template>

<script lang="ts">
import { useInfoPokemonStore } from '@/stores/useInfoPokemonStore';
import { useTeamPokemonStore } from '@/stores/useTeamPokemonStore';
import { getTypeColor } from '@/utils/color';
import { decimeterToMeter, hectogramsToKg } from '@/utils/conversion';
import { formatWord } from '@/utils/format';

  export default {
    name: 'PokemonInfos',

    data() {
      return {
        infoPokemonStore: useInfoPokemonStore(),
        teamStore: useTeamPokemonStore(),
      }
    },

    computed: {
      pokemon() {
        return this.infoPokemonStore.pokemon;
      },

      visibleAbilities() {
        return this.pokemon?.abilities.filter(a => !a.is_hidden)
      },

      isPokemonInTeam(): boolean {
        if (!this.pokemon) return false;
        return this.teamStore.team.some(p => p.id === this.pokemon!.id);
      }
    },

    methods:{
      getTypeColor,
      decimeterToMeter,
      hectogramsToKg,
      formatWord,
      toggleTeam() {
        if (!this.pokemon) return;

        if (this.isPokemonInTeam) {
          this.teamStore.removePokemon(this.pokemon.id);
        } else {
          this.teamStore.addPokemon(this.pokemon);
        }
      }
    }
  }

</script>