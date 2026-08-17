function haystack(parts) {
  return parts.filter(Boolean).join(' ').toLowerCase()
}

export function matchesQuery(query, ...parts) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return haystack(parts).includes(q)
}
