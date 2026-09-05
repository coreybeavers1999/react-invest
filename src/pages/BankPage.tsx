import { Container } from "@mantine/core"
import styles from "../features/bank/bank.module.css"
import AccountBalance from "../features/bank/components/AccountBalance"

function BankPage() {
    return (
        <div>
            <h1>Bank Page</h1>

            <Container
                fluid
                className={styles.layout}
            >
                <div className={styles.sidebar}>
                    <h2>Account Balances</h2>
                    <AccountBalance accountType="checking" />
                    <AccountBalance accountType="savings" />
                    <AccountBalance accountType="broken" />
                </div>

                <div className={styles.transactionColumn}>
                    <h2>Transaction History</h2>
                </div>
            </Container>
        </div>
    )
}

export default BankPage