<template>
  <v-row class="flex-grow-1 mx-16 my-8">
    <v-col
      v-for="i in 6"
      :key="i"
      cols="4"
    >
      <template v-if="teamStore.team[i - 1]">
        <v-card
          class="pa-6 d-flex flex-column align-center position-relative"
          rounded
        >
          <v-btn
            icon
            color="red"
            class="position-absolute"
            style="top: 10px; right: 10px;"
            @click="teamStore.removePokemon(teamStore.team[i - 1].id)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>

          <div
            class="d-flex align-center justify-center"
            style="height: 250px; width: 250px; cursor: pointer;"
            @click="goToDetail(teamStore.team[i - 1])"
          >
            <v-img
              v-if="teamStore.team[i - 1].official_artwork.front_default"
              :src="teamStore.team[i - 1].official_artwork.front_default"
              width="250"
              height="250"
              class="rounded"
              aspect-ratio="1"
              cover
            />

            <div v-else>
              <h2 class="text-primary">Image not found</h2>
            </div>
          </div>

          <v-card-subtitle class="mt-1">
            ID: {{ formatPokemonId(teamStore.team[i - 1].id) }}
          </v-card-subtitle>
          <v-card-title>
            {{ formatWord(teamStore.team[i - 1].name) }}
          </v-card-title>
          <v-card-subtitle class="mt-2">
            <div class="d-flex ga-2">
              <span
                v-for="t in teamStore.team[i - 1].types"
                :key="t.slot"
                class="px-2 py-1 rounded text-white"
                :style="{ backgroundColor: getTypeColor(t.type.name) }"
              >
                {{ t.type.name }}
              </span>
            </div>
          </v-card-subtitle>
        </v-card>
      </template>

      <template v-else>
        <v-card
          class="pa-6 d-flex flex-column align-center justify-center"
          height="405"
          rounded
        >
          <span class="text-h5 font-weight-bold">({{ i }})</span>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { getTypeColor } from '@/utils/color';
import { formatWord, formatPokemonId } from '@/utils/format';
import { useTeamPokemonStore } from '@/stores/useTeamPokemonStore';

export default {
  name: 'TeamPage',

  setup() {
    const teamStore = useTeamPokemonStore();
    const router = useRouter();

    const goToDetail = (pokemon: any) => {
      router.push({ path: `/pokemon/${pokemon.id}` });
    };

    const removeFromTeam = (idPokemon: number) => {
      teamStore.removePokemon(idPokemon);
    };

    return {
      teamStore,
      goToDetail,
      removeFromTeam,
      getTypeColor,
      formatWord,
      formatPokemonId,
    };
  },
};
</script>
