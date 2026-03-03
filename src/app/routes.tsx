// Single-page application — all routing is scroll-based
// This file is kept for future expansion (e.g. adding a /projects page)

export const routes = {
  home: '/',
} as const

export type Route = keyof typeof routes
