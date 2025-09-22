export function decimeterToMeter(valueDm: number): string {
  const metros = valueDm / 10;
  return `${metros} m`;
}

export function hectogramsToKg(valueHg: number): string {
  const kg = valueHg / 10;
  return `${kg.toFixed(1)} kg`;
}