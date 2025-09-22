import { defineStore } from 'pinia'
import type { IInfoPokemon } from '@/interfaces'
import { watch } from 'vue'

export const useTeamPokemonStore = defineStore('TeamStore', {
  state: () => ({
    team: [] as IInfoPokemon[],
    maxTeamSize: 6
  }),

  getters: {
    teamCount: (state) => state.team.length,
    isFull: (state) => state.team.length >= state.maxTeamSize
  },

  actions: {
    addPokemon(pokemon: IInfoPokemon) {
      if (this.team.length >= this.maxTeamSize) return
      if (!this.team.find(p => p.id === pokemon.id)) {
        this.team.push(pokemon)
      }
    },

    removePokemon(pokemonId: number) {
      this.team = this.team.filter(p => p.id !== pokemonId)
    },

    clearTeam() {
      this.team = []
    },

    setTeam(pokemons: IInfoPokemon[]) {
      this.team = pokemons.slice(0, this.maxTeamSize)
    },

    loadFromStorage() {
      const saved = localStorage.getItem('team')
      if (saved) this.team = JSON.parse(saved)
    },

    setupPersistence() {
      this.loadFromStorage()
      watch(
        () => this.team,
        (team) => {
          localStorage.setItem('team', JSON.stringify(team))
        },
        { deep: true }
      )
    }
  }
})
