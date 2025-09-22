<template>
  <v-card class="pa-4 bg-grey-lighten-2" style="width: 100%;" elevation="0">
    <v-card-title
      @click="expanded = !expanded"
      class="d-flex justify-space-between align-center"
      style="cursor: pointer;"
    >
      <h3 class="text-h5 font-weight-regular text-black">
        Moves:
      </h3>
      <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-card-title>

    <v-expand-transition>
      <div v-show="expanded">
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(move, index) in moves"
              :key="index"
              cols="12" sm="2"
            >
              <v-chip 
                class="ma-1" 
                outlined 
                :style="{ backgroundColor: 'rgba(0, 194, 255, 0.9)' }">
                  {{ formatMoveName(move.move.name) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

interface IMove {
  move: {
    name: string
    url: string
  }
}

export default {
  name: 'PokemonMoves',

  props: {
    moves: {
      type: Array as PropType<IMove[]>,
      required: true
    }
  },

  setup() {
    const expanded = ref(false)
    return { expanded }
  },

  methods: {
    formatMoveName(name: string) {
      return name
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    }
  }
}
</script>
