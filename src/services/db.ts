import { Dexie, type EntityTable } from "dexie"
import type { AccountType } from "../features/bank/types"

interface Transaction {
    id: number,
    label: string,
    account: AccountType,
    amount: number,
    balance: number,
    date: Date
}

type NewTransaction = Omit<Transaction, "id, balance, date">

const db = new Dexie("GameDatabase") as Dexie & {
    transactions: EntityTable<Transaction, "id">
}

db.version(1).stores({
    transactions: "++id, label, account"
})

db.on("populate", () => {
    const transactions: Transaction[] = []

    // First Paycheck
    transactions.push({
        id: 1,
        label: "Payday",
        account: "checking",
        amount: 20000,
        balance: 20000,
        date: new Date("2026-01-01")
    })

    // Bought fast food
    let cost = 1024
    transactions.push({
        id: 2,
        label: "McDonald's",
        account: "checking",
        amount: -cost,
        balance: transactions[0].balance - cost,
        date: new Date("2026-01-01T16:39")
    })

    // Bought groceries
    cost = 7349
    transactions.push({
        id: 3,
        label: "Walmart",
        account: "checking",
        amount: -cost,
        balance: transactions[1].balance - cost,
        date: new Date("2026-01-02T20:25")
    })

    // Savings init
    transactions.push({
        id: 4,
        label: "Savings Account Creation",
        account: "savings",
        amount: 0,
        balance: 0,
        date: new Date("2026-02-23T17:47")
    })

    db.transactions.bulkAdd(transactions)
})

export type { Transaction, NewTransaction }
export { db }