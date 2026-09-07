import { Flex, Loader, Modal } from "@mantine/core";
import type { PurchaseState } from "./types";
import type { AccountType } from "../bank/types";
import AccountSelect from "./components/AccountSelect";
type PurchaseDialogProps = {
    state: PurchaseState,
    onCancel: () => void,
    onSelectAccount: (selected: AccountType) => void
}

export default function PurchaseDialog({ state, onCancel, onSelectAccount }: PurchaseDialogProps) {

    if (!state.info) return null

    // Display correct body according to state
    let body = (
        <AccountSelect
            info={state.info}
            onSelectAccount={onSelectAccount}
        />
    )

    if (state.state == "authorizing") {
        body = (
            <Flex
                direction={{ base: 'column' }}
                justify="center"
                align="center"
            >
                <h1>Authorizing...</h1>
                <Loader
                    type="dots"
                    size="xl"
                />
            </Flex>
        )
    } else if (state.state == "success") {
        body = (
            <Flex
                direction={{ base: 'column' }}
                justify="center"
                align="center"
            >
                <h1>Payment Successful</h1>
            </Flex>
        )
    } else if (state.state == 'failure') {
        body = (
            <Flex
                direction={{ base: 'column' }}
                justify="center"
                align="center"
            >
                <h1>Payment Failed</h1>
                <h2 style={{ textAlign: "center" }}>{state.error}</h2>
            </Flex>
        )
    }

    function lockedCancel() {
        // Can't close if current state is past account-select
        if (state.state !== 'account-select') return

        onCancel()
    }

    return (
        <Modal
            opened={state.state !== 'idle'}
            onClose={lockedCancel}
            withCloseButton={state.state == 'account-select'}
            title={state.state == 'account-select' ? "Confirm purchase" : ''}
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 4
            }}
        >
            {body}
        </Modal>
    )
}