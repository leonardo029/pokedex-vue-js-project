import type { IEvolutionChain } from "@/interfaces";
import api from "../api";

export const getEvolutionChain = async({ idSpecie }:{ idSpecie:string }) : Promise<IEvolutionChain> => {
  try {
    const response = await api.get(`evolution-chain/${idSpecie}`);
    return response.data;
  } catch (error) {
    console.error('Error to get evolution chain:', error);
    throw new Error('Error to get evolution chain!');
  }
}