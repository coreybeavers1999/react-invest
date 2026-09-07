import { createContext } from "react"
import type { PurchaseInfo, PurchaseResult } from "./types"

export const PurchaseContext = createContext<
    ((info: PurchaseInfo) => Promise<PurchaseResult>) | undefined
>(undefined)