export function formatWord(name: string): string {
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatPokemonId(id: number): string {
  return id.toString().padStart(5, "0");
}