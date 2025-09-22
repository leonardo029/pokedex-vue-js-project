import type { ISpecies } from "@/interfaces";
import api from "../api";

export const getSpecies = async({ idPokemon }:{ idPokemon:number }) : Promise<ISpecies> => {
  try {
    const response = await api.get(`pokemon-species/${idPokemon}`);
    return response.data;
  } catch (error) {
    console.error('Error to get species:', error);
    throw new Error('Error to get species!');
  }
}