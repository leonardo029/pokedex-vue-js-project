import type { IInfoPokemon, IEvolutionChain } from '@/interfaces'
import { getInfoPokemon, getInfoType, getSpecies, getEvolutionChain } from '@/services'
import { defineStore } from 'pinia'

export const useInfoPokemonStore = defineStore('InfoPokemon', {
  state: () => ({
    pokemon: null as IInfoPokemon | null,
    loading: false,
    error: null as string | null,
    advantages: [] as string[],
    weaknesses: [] as string[],
    evolutionChain: null as IEvolutionChain | null
  }),

  actions: {
    async setPokemon(nameOrId: string, listInfoPokemon: IInfoPokemon[] = []) {
      const found = listInfoPokemon.find(
        p => p.name === nameOrId || p.id === Number(nameOrId)
      )

      this.loading = true
      this.error = null

      try {
        if (found) {
          this.pokemon = found
        } else {
          const data = await getInfoPokemon({ nameOrIdPokemon: nameOrId })
          this.pokemon = data
        }

        await Promise.allSettled([
          this.computeTypeEffectiveness(),
          this.fetchEvolutionChain()
        ])

      } catch (err) {
        console.error('Error fetching pokemon:', err)
        this.error = 'Pokemon not found'
        this.pokemon = null
        this.advantages = []
        this.weaknesses = []
        this.evolutionChain = null
      } finally {
        this.loading = false
      }
    },

    async computeTypeEffectiveness() {
      if (!this.pokemon) return
      try {
        const types = this.pokemon.types ?? []
        const weaknesses: Record<string, number> = {}
        const advantages: Record<string, number> = {}

        for (const t of types) {
          try {
            const damageRelations = await getInfoType({ type: t.type.name })

            damageRelations.damage_relations?.double_damage_from?.forEach(d => {
              weaknesses[d.name] = (weaknesses[d.name] ?? 1) * 2
            })
            damageRelations.damage_relations?.half_damage_from?.forEach(d => {
              weaknesses[d.name] = (weaknesses[d.name] ?? 1) * 0.5
            })
            damageRelations.damage_relations?.no_damage_from?.forEach(d => {
              weaknesses[d.name] = 0
            })

            damageRelations.damage_relations?.double_damage_to?.forEach(d => {
              advantages[d.name] = (advantages[d.name] ?? 1) * 2
            })
            damageRelations.damage_relations?.half_damage_to?.forEach(d => {
              advantages[d.name] = (advantages[d.name] ?? 1) * 0.5
            })
            damageRelations.damage_relations?.no_damage_to?.forEach(d => {
              advantages[d.name] = 0
            })
          } catch (err) {
            console.warn(`Error fetching type relations: ${t.type.name}`, err)
          }
        }

        this.weaknesses = Object.entries(weaknesses)
          .filter(([_, factor]) => factor > 1)
          .map(([name]) => name)

        this.advantages = Object.entries(advantages)
          .filter(([_, factor]) => factor > 1)
          .map(([name]) => name)
      } catch (err) {
        console.warn('Error in computeTypeEffectiveness', err)
        this.weaknesses = []
        this.advantages = []
      }
    },

    async fetchEvolutionChain() {
      if (!this.pokemon) return
      try {
        const species = await getSpecies({ idPokemon: this.pokemon.id })

        if (!species?.evolution_chain?.url) {
          this.evolutionChain = null
          return
        }

        const urlParts = species.evolution_chain.url.split("/").filter(Boolean)
        const specieEvolutionId = urlParts[urlParts.length - 1]

        this.evolutionChain = await getEvolutionChain({ idSpecie: specieEvolutionId })
      } catch (err) {
        console.warn('Error fetching evolution chain', err)
        this.evolutionChain = null
      }
    }
  }
})
