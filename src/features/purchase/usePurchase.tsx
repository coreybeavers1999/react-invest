import { useContext } from "react"
import { PurchaseContext } from "./PurchaseContext"

export function usePurchase() {
    const attemptPurchase = useContext(PurchaseContext)

    if (attemptPurchase === undefined) {
        throw new Error("PurchaseProvider must be provided to use here.")
    }

    return attemptPurchase
}