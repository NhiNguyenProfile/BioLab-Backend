export function getToken(bearer: string): string | null {
  if (bearer && bearer.startsWith('Bearer ')) {
    return bearer.split(' ')[1]
  }
  return null
}
