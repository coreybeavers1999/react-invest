export const ACCOUNT_TYPES = ["checking", "savings"] as const

export type AccountType = typeof ACCOUNT_TYPES[number]