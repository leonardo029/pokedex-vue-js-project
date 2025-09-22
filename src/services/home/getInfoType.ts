import type { IDamageRelations } from "@/interfaces";
import api from "../api";

export const getInfoType = async ({ type } : { type:string }): Promise<IDamageRelations> => {
  try {
    const response = await api.get(`type/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error to get type information:', error);
    throw new Error('Error to get type information!');
  }
}