export function serializeBigInt(data: any): string {
  return JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() + 'n' : value,
  );
}

export function deserializeBigInt(json: string): any {
  return JSON.parse(json, (key, value) =>
    typeof value === 'string' && /^-?\d+n$/.test(value)
      ? Number(value.slice(0, -1))
      : value,
  );
}
