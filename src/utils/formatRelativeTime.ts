function toDate(input: Date | string | number): Date {
  return input instanceof Date ? input : new Date(input)
}

/**
 * French relative time from a past instant to a reference "now" (defaults to current time).
 * Designed for tests: always pass `now` for deterministic output.
 */
export function formatRelativeTime(
  past: Date | string | number,
  nowInput: Date | string | number = new Date(),
): string {
  const date = toDate(past)
  const now = toDate(nowInput)

  if (Number.isNaN(date.getTime()) || Number.isNaN(now.getTime())) {
    return 'maintenant'
  }

  const diffMs = now.getTime() - date.getTime()
  if (diffMs < 0) {
    return 'maintenant'
  }

  const sec = Math.floor(diffMs / 1000)
  if (sec < 10) {
    return 'maintenant'
  }
  if (sec < 60) {
    return 'il y a moins d\'une minute'
  }

  const min = Math.floor(diffMs / 60_000)
  if (min < 2) {
    return 'il y a 1 minute'
  }
  if (min < 60) {
    return `il y a ${min} minutes`
  }

  const h = Math.floor(diffMs / 3_600_000)
  if (h < 2) {
    return 'il y a 1 heure'
  }
  if (h < 24) {
    return `il y a ${h} heures`
  }

  const d = Math.floor(diffMs / 86_400_000)
  if (d < 2) {
    return 'il y a 1 jour'
  }
  if (d < 7) {
    return `il y a ${d} jours`
  }

  const w = Math.floor(d / 7)
  if (w < 2) {
    return 'il y a 1 semaine'
  }
  return `il y a ${w} semaines`
}
