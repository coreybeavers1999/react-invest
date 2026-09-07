import { Flex } from "@mantine/core"
import type { PurchaseInfo } from "../features/purchase/types"
import PurchaseButton from "../components/PurchaseButton"

function HomePage() {
    const burgerPurchase: PurchaseInfo = {
        amount: 1283,
        type: "withdrawal",
        vendor: "McDonald's",
        label: "Quarter pounder w/ cheese",
    }

    const paycheckPurchase: PurchaseInfo = {
        amount: 10000,
        type: "deposit",
        vendor: "Direct Deposit",
        label: "Congrats, you're getting paid!"
    }

    return (
        <div>
            <h1>Welcome home.</h1>

            <Flex
                gap="sm"
                justify="flex-start"
                align="flex-start"
                direction="column"
            >
                <PurchaseButton
                    label="Work at your job"
                    purchaseInfo={paycheckPurchase}
                    onSuccess={() => console.log('You just got paid!')}
                />

                <PurchaseButton
                    label="Purchase McDonald's Burger"
                    purchaseInfo={burgerPurchase}
                    onSuccess={() => console.log('Burger Purchased!')}
                />
            </Flex>
        </div>
    )
}

export default HomePage