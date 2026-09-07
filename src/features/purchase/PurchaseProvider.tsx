import { useRef, useState, type ReactNode } from "react";
import type { PurchaseInfo, PurchaseResult, PurchaseState } from "./types";
import PurchaseDialog from "./PurchaseDialog";
import { PurchaseContext } from "./PurchaseContext";
import type { AccountType } from "../bank/types";
import { createTransaction, type CreateTransactionParam } from "../bank/bankService";

type PurchaseProviderProps = {
    children: ReactNode;
}

export function PurchaseProvider({ children }: PurchaseProviderProps) {
    // Purchase state is an object, use this method to get a fresh object reference each time
    function defaultValue(): PurchaseState {
        return {
            info: null,
            state: "idle",
            selectedAccount: "checking",
            error: null
        }
    }
    const [state, setState] = useState<PurchaseState>(defaultValue())
    const pendingResolve = useRef<((result: PurchaseResult) => void) | null>(null)

    // Entrypoint for children components
    function attemptPurchase(info: PurchaseInfo): Promise<PurchaseResult> {
        // Create the resolve promise
        const purchasePromise = new Promise<PurchaseResult>((resolve) => {
            pendingResolve.current = resolve
        })

        // Set state
        setState({
            info: info,
            state: "account-select",
            selectedAccount: "checking",
            error: null
        })

        return purchasePromise
    }

    // Called when the dialog has an account selected and is submitted
    function selectAccount(account: AccountType) {
        setState(previousState => ({
            ...previousState,
            selectedAccount: account,
            state: "authorizing"
        }))

        tryPurchase(account)
    }

    // Called internally to attempt a purchase
    // No matter the status of the request, resolves the promise with a PurchaseResult
    async function tryPurchase(selectedAccount: AccountType) {
        // Default response to success
        let promiseResponse: PurchaseResult = { status: "success" }

        try {
            // Create transaction object for bank transaction
            const data: CreateTransactionParam = {
                account: selectedAccount,
                amount: state.info?.amount || 0,
                label: state.info?.vendor || "UNKNOWN VENDOR",
                type: state.info?.type || "withdrawal"
            }

            // Make transaction request
            await createTransaction(data)

            // If everything went well, set state to success and resolve in finally
            setState(prev => ({
                ...prev,
                state: "success"
            }))
        }
        catch (error: unknown) {
            // Something went wrong, error could be anything, so default the message and try to read it
            let errorMessage = "Unknown error in bankService"
            if (error instanceof Error) errorMessage = error.message

            // We optimistically defaulted promiseResolve to success, update it to failure
            promiseResponse = { status: "failure", error: errorMessage }
            setState(prev => ({
                ...prev,
                state: "failure",
                error: errorMessage,
            }))
        }
        finally {
            // Show the final screen for few seconds and then resolve the promise and reset state
            setTimeout(() => {
                resolvePurchase(promiseResponse)
                setState(defaultValue())
            }, 2000)
        }
    }

    // Called if the user clicks off the modal
    function cancelPurchase() {
        // Reset state to idle and resolve with cancelled result
        setState(defaultValue())
        resolvePurchase({ status: "canceled" })
    }

    // Resolve the function to the child component
    function resolvePurchase(result: PurchaseResult): void {
        // Store resolve function and then clean house
        const resolve = pendingResolve.current
        pendingResolve.current = null

        // If the resolve exists, call it with the result
        if (resolve !== null) resolve(result)
    }

    return (
        <PurchaseContext.Provider value={attemptPurchase}>
            {children}

            <PurchaseDialog
                state={state}
                onCancel={cancelPurchase}
                onSelectAccount={selectAccount}
            />
        </PurchaseContext.Provider>
    )
}