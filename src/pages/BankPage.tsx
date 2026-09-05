import { Container } from "@mantine/core"
import styles from "./BankPage.module.css"

function BankPage() {
    return (
        <div>
            <h1>Bank Page</h1>

            <Container fluid className={styles.layout}>
                <div className={styles.sidebar}>First Column</div>
                <div className={styles.transactionColumn}>Second Column</div>
            </Container>
        </div>
    )
}

export default BankPage