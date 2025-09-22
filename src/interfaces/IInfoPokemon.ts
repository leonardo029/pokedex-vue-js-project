import type { IStatPokemon } from "./pokemon/IStatPokemon"
import type { ITypePokemon } from "./ITypePokemon"

export interface IInfoPokemon {
  id: number,
  name: string,
  height: number,
  weight: number,
  types: ITypePokemon[],
  moves: {
    move: {
      name: string,
      url: string
    }
  }[],
  abilities: {
    ability:{
      name: string
    },
    is_hidden: boolean,
    slot: number
  }[],
  stats: IStatPokemon[],
  official_artwork: {
    front_default: string
  }
}