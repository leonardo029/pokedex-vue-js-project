export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    bug: '#a8b820',
    normal: '#a8a878',
    poison: '#a040a0',
    ground: '#e0c068',
    fairy: '#ee99ac',
    fighting: '#c03028',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    flying: '#a890f0',
  };
  return colors[type] || '#999999';
}