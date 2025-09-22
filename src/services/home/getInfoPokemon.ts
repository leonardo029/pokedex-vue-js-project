import type { IInfoPokemon } from "@/interfaces";
import api from "../api";

export const getInfoPokemon = async ({ nameOrIdPokemon } : { nameOrIdPokemon:string }): Promise<IInfoPokemon> => {
  try {
    const response = await api.get(`pokemon/${nameOrIdPokemon}`);

    const mappedPokemon: IInfoPokemon = {
      id: response.data.id,
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities,
      types: response.data.types,
      moves: response.data.moves,
      stats: response.data.stats,
      official_artwork: {
        front_default: response.data.sprites.other['official-artwork'].front_default
      },
    };

    return mappedPokemon;
  } catch (error) {
    console.error('Error to search pokemon:', error);
    throw new Error('Error to search pokemon!');
  }
}