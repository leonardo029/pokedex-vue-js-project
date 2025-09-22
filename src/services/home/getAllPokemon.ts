import type { IAllNamesPokemon } from "@/interfaces";
import api from "../api";

export const fetchAllPokemonNames = async ({ limit = 2500, offset } : { limit:number; offset?:number }): Promise<IAllNamesPokemon> => {
  try {
    const response = await api.get(`pokemon/?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all pokemon names:', error);
    throw new Error('Error fetching all pokemon names!');
  }
}