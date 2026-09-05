import styles from "../bank.module.css"
import { Card, Group, Loader } from "@mantine/core"
import { capitalize, intToCurrency } from "../../../util/util"
import { getBalance } from "../bankService"
import { useEffect, useState } from "react"

type AccountBalanceProps = {
    accountType: "checking" | "savings" | "broken"
}

function AccountBalance({ accountType }: AccountBalanceProps) {
    const [balance, setBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const _balance = await getBalance(accountType)
                setBalance(_balance)
            } catch (e) {
                console.log('Error', e)
                setError(e)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [accountType])


    // Default content to loaded state
    let cardContent = (
        <>
            <div className="label">{capitalize(accountType)} Balance</div>
            <div className={styles.balance}>{intToCurrency(balance)}</div>
        </>
    )

    // Exception states
    if (error) {
        cardContent = <div className={styles.error}>Something went wrong.</div>
    } else if (isLoading) {
        cardContent = <Loader type="dots" />
    }

    return (
        <Card
            className={styles.balanceCard}
            withBorder
            radius="md"
            color="gray"
        >
            <Group
                justify="space-between"
                grow
                gap="xl"
            >
                {cardContent}
            </Group>
        </Card>
    )
}

export default AccountBalance;