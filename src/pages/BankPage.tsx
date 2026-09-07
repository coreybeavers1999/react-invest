import { Container } from "@mantine/core"
import styles from "../features/bank/bank.module.css"
import AccountBalance from "../features/bank/components/AccountBalance"
import TransactionHistory from "../features/bank/components/TransactionHistory"
import { useState } from "react"
import { capitalize } from "../util/util"
import type { AccountType } from "../features/bank/types"

function BankPage() {
    const [viewingAccount, setViewingAccount] = useState<AccountType>("checking")

    return (
        <div>
            <h1>Bank Page</h1>

            <Container
                fluid
                className={styles.layout}
            >
                <div className={styles.sidebar}>
                    <h2>Account Balances</h2>
                    <AccountBalance
                        selected={viewingAccount == 'checking'}
                        accountType="checking"
                        showBalanceText={true}
                        onClick={(e: AccountType) => setViewingAccount(e)}
                    />
                    <AccountBalance
                        selected={viewingAccount == 'savings'}
                        accountType="savings"
                        showBalanceText={true}
                        onClick={(e: AccountType) => setViewingAccount(e)}
                    />
                </div>

                <div className={styles.transactionColumn}>
                    <h2>Transaction History - {capitalize(viewingAccount)}</h2>
                    <TransactionHistory account={viewingAccount} />
                </div>
            </Container>
        </div>
    )
}

export default BankPage