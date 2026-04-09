import { describe, expect, it } from 'vitest'
import { formatRelativeTime } from './formatRelativeTime'

/** Fixed reference time for stable assertions */
const NOW = new Date('2025-06-10T14:00:00.000Z')

describe('formatRelativeTime', () => {
  it('returns "maintenant" for the same instant', () => {
    expect(formatRelativeTime(NOW, NOW)).toBe('maintenant')
  })

  it('returns "maintenant" for a few seconds ago', () => {
    const past = new Date('2025-06-10T13:59:55.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('maintenant')
  })

  it('returns "il y a moins d\'une minute" under one minute but after 10s', () => {
    const past = new Date('2025-06-10T13:59:20.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a moins d\'une minute')
  })

  it('returns "il y a 1 minute" for about one minute', () => {
    const past = new Date('2025-06-10T13:58:50.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 1 minute')
  })

  it('returns "il y a 2 minutes"', () => {
    const past = new Date('2025-06-10T13:58:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 2 minutes')
  })

  it('returns "il y a 1 heure" for exactly one hour', () => {
    const past = new Date('2025-06-10T13:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 1 heure')
  })

  it('returns "il y a 3 heures"', () => {
    const past = new Date('2025-06-10T11:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 3 heures')
  })

  it('returns "il y a 1 jour" for about one day', () => {
    const past = new Date('2025-06-09T12:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 1 jour')
  })

  it('returns "il y a 3 jours"', () => {
    const past = new Date('2025-06-07T14:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 3 jours')
  })

  it('returns "il y a 1 semaine" for about one week', () => {
    const past = new Date('2025-06-03T14:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 1 semaine')
  })

  it('returns "il y a 2 semaines"', () => {
    const past = new Date('2025-05-27T14:00:00.000Z')
    expect(formatRelativeTime(past, NOW)).toBe('il y a 2 semaines')
  })

  it('treats future dates as "maintenant"', () => {
    const future = new Date('2025-06-10T15:00:00.000Z')
    expect(formatRelativeTime(future, NOW)).toBe('maintenant')
  })

  it('accepts ISO string input', () => {
    expect(formatRelativeTime('2025-06-10T13:58:00.000Z', NOW)).toBe('il y a 2 minutes')
  })
})
