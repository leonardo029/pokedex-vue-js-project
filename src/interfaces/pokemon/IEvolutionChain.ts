export interface IEvolutionChain {
  chain: Chain;
}

export interface Chain {
    evolution_details: EvolutionDetail;
    evolves_to: Chain[];
    species: SpeciesAndTrigger;
}

export interface EvolutionDetail {
    trigger: SpeciesAndTrigger;
}

export interface SpeciesAndTrigger {
    name: string;
}
