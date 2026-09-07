import { useState } from "react"
import type { PurchaseInfo } from "../types"
import { ACCOUNT_TYPES } from "../../bank/types"
import type { AccountType } from "../../bank/types"
import { Grid, Container, Button } from "@mantine/core"
import { intToCurrency } from "../../../util/util"
import AccountBalance from "../../bank/components/AccountBalance"
import styles from "../purchase.module.css"

type AccountSelectProps = {
    info: PurchaseInfo,
    onSelectAccount: (selected: AccountType) => void
}

export default function AccountSelect({ info, onSelectAccount }: AccountSelectProps) {
    const [selected, setSelected] = useState<AccountType>("checking")

    return (
        <Grid grow>
            <Grid.Col span={4}>
                <h2>Order details</h2>
                <div style={{ minHeight: '6px' }} />
                <Container>
                    <div className="info-row">
                        <div className="info-row__label">Vendor</div>
                        <div className="info-row__value">{info?.vendor}</div>
                    </div>


                    <div className="info-row">
                        <div className="info-row__label">Label</div>
                        <div className="info-row__value">{info?.label}</div>
                    </div>

                    <div style={{ minHeight: '12px' }} />

                    <div className={styles.orderTotalRow}>
                        <div className={styles.label}>Order Total</div>
                        <div className={styles.total}>{intToCurrency(info?.amount)}</div>
                    </div>
                </Container>
            </Grid.Col>

            <Grid.Col
                span={3}
                className={styles.selectPaymentColumn}
            >
                <h2>Select Payment Method</h2>
                <div style={{ minHeight: "12px" }} />
                {ACCOUNT_TYPES.map((accountName) => {
                    return (
                        <AccountBalance
                            key={accountName}
                            selected={selected == accountName}
                            showBalanceText={false}
                            accountType={accountName}
                            onClick={(e) => setSelected(e)}
                        />
                    )
                })}

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={() => onSelectAccount(selected)}>Confirm Purchase</Button>
                </div>

            </Grid.Col>
        </Grid>
    )
}