export interface Item {
  id: number
  name: string
  price: number
  category: string
}

const CATEGORIES = ['books', 'games', 'music', 'tools', 'food']

export function generateItems(count: number): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${String(i).padStart(4, '0')}`,
    price: ((i * 7919) % 10_000) / 100,
    category: CATEGORIES[i % CATEGORIES.length],
  }))
}

export interface Stats {
  count: number
  averagePrice: number
}

// Deliberately slow: the busy loop simulates a heavy aggregation so the
// cost of recomputing is noticeable. The point of the demo is that useMemo
// skips this when its inputs haven't changed.
export function expensiveStats(items: Item[]): Stats {
  let waste = 0
  for (let i = 0; i < 2_000_000; i++) waste += i % 7
  void waste

  const total = items.reduce((sum, item) => sum + item.price, 0)
  return {
    count: items.length,
    averagePrice: items.length > 0 ? total / items.length : 0,
  }
}
