import type { AccountType } from "../bank/types"

export type PurchaseInfo = {
    vendor: string,
    label: string,
    amount: number,
    type: "deposit" | "withdrawal"
}

export type PurchaseState = {
    info: PurchaseInfo | null,
    state: "idle" | "account-select" | "authorizing" | "success" | "failure",
    selectedAccount: AccountType,
    error: string | null
}

export type PurchaseResult =
    | { status: "success" }
    | { status: "failure"; error: string }
    | { status: "canceled" }