import { Button } from "@mantine/core"
import { useState } from "react"
import type { PurchaseInfo } from "../features/purchase/types"
import { usePurchase } from "../features/purchase/usePurchase"

type PurchaseButtonProps = {
    label: string,
    purchaseInfo: PurchaseInfo,
    onSuccess: () => void,
    onCancel?: () => void,
    onFail?: (errorMessage: string) => void,
}

export default function PurchaseButton({ label, purchaseInfo, onSuccess, onCancel, onFail }: PurchaseButtonProps) {
    const [pending, setPending] = useState(false)
    const tryPurchase = usePurchase()

    // Called synchronously when button clicked
    function triggerAttemptPurchase() {
        setPending(true)
        attemptPurchase()
    }

    async function attemptPurchase() {
        try {
            const res = await tryPurchase(purchaseInfo)

            switch (res.status) {
                case ("success"):
                    onSuccess()
                    break
                case ("canceled"):
                    onCancel?.()
                    break
                case ("failure"):
                    onFail?.(res.error)
                    break
                default:
                    onCancel?.()
            }
        } catch (error: unknown) {
            let message = "Unknown error from purchase button"
            if (error instanceof Error) message = error.message

            onFail?.(message)
        } finally {
            setPending(false)
        }
    }

    return (
        <Button
            loading={pending}
            loaderProps={{ type: 'dots' }}
            variant="filled"
            size="md"
            radius="lg"
            onClick={() => triggerAttemptPurchase()}
        >
            {label}
        </Button>
    )
}