export function getPrevIndex(current: number, total: number): number {
  return (current - 1 + total) % total;
}

export function getNextIndex(current: number, total: number): number {
  return (current + 1) % total;
}
