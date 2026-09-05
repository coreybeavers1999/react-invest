export async function getBalance(account: "checking" | "savings"): Promise<number> {
    // Simulate response time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    switch (account) {
        case ("checking"):
            return 19233
        case ("savings"):
            return 3993811
        default:
            throw new Error("Invalid account")
    }
}