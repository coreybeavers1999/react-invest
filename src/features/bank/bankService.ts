import { db } from "../../services/db"
import type { AccountType } from "./types";

export async function getBalance(account: AccountType): Promise<number> {
    // Reject invalid accounts
    if (!["checking", "savings"].includes(account)) throw new Error("Invalid account")

    // Simulate response time
    await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 500))

    // Fetch the latest transaction for this account
    const lastTransaction = await db.transactions
        .where({ account: account })
        .last();

    if (lastTransaction == null) {
        throw new Error("No transactions found. Please delete your IndexedDB and restart.")
    }

    return lastTransaction.balance
}

export async function getTransactions(account = "checking") {
    // Simulate response time
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    return (await db.transactions.where({ account: account }).toArray()).reverse()
}

export type CreateTransactionParam = {
    label: string,
    amount: number,
    type: "deposit" | "withdrawal",
    account: AccountType
}

export async function createTransaction({ label, amount, type, account }: CreateTransactionParam) {
    // Simulate response time
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 2000))

    // Only positive amounts allowed
    if (amount < 0)
        throw new Error("Transaction amount must be positive")

    // Enforce int only values
    amount = Math.trunc(amount)

    // Get balance from last transaction
    const currentBalance = await getBalance(account)

    // If this is a withdrawal, make sure there's enough money
    if (type == 'withdrawal' && amount > currentBalance)
        throw new Error("Insufficient Funds")

    // Apply transaction direction
    amount = type == 'deposit' ? amount : -amount

    // Create transaction record
    await db.transactions.add({
        label: label,
        account: account,
        amount: amount,
        balance: Math.trunc(currentBalance + amount),
        date: new Date()
    })

    return true
}