export interface ISpecies {
    evolution_chain:        EvolutionChain;
    flavor_text_entries:    FlavorTextEntry[];
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language:    Color;
  version:     Color;
}

export interface Color {
    name: string;
    url:  string;
}