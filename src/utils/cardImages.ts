export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`

  return `${base}${path.replace(/^\/+/, '')}`
}

export function cardImagePath(cardName: string): string {
  const filename = cardName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return assetPath(`cards/${filename}.png`)
}
