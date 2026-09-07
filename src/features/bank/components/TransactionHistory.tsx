import { useEffect, useState } from "react";
import styles from "../bank.module.css"
import { Card, Input, Loader, Table } from "@mantine/core";
import { getTransactions } from "../bankService";
import { dateFormat, intToCurrency } from "../../../util/util";
import type { Transaction } from "../../../services/db";
import type { AccountType } from "../types";

type TransactionHistoryProps = {
    account: AccountType
}

export default function TransactionHistory(props: TransactionHistoryProps) {
    const [searched, setSearched] = useState('')
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState<Transaction[]>([])

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await getTransactions(props.account)
                setRows(data)
            }
            catch (e) {
                console.log('Error', e)
            }
            finally {
                setLoading(false)
            }
        }
        load();
    }, [props.account])

    function filterFn(transaction: Transaction) {
        const val = transaction.label
        if (searched == '') return true

        return val.toLowerCase().includes(searched.toLowerCase())
    }

    let tableBody
    if (loading) {
        tableBody = (
            <Table.Tr>
                <Table.Td
                    colSpan={3}
                    align="center"
                >
                    <Loader type="dots" />
                </Table.Td>
            </Table.Tr>
        )
    } else {
        tableBody = rows
            .filter(filterFn)
            .map((r, index) => {
                return (
                    <Table.Tr
                        className={styles.row}
                        style={{ "--row-index": index, color: r.amount > 0 ? 'green' : 'black' }}
                        key={r.id}
                    >
                        <Table.Td>{r.label}</Table.Td>
                        <Table.Td style={{ color: "rgb(180, 180, 180)" }}>{dateFormat(r.date)}</Table.Td>
                        <Table.Td align="right">{intToCurrency(r.amount)}</Table.Td>
                    </Table.Tr>
                )
            })
    }

    return (
        <Card
            className={styles.transactionsCard}
            withBorder
            radius="lg"
            color="gray"
        >
            <Input
                placeholder="Search transaction history"
                onChange={(e) => setSearched(e.target.value)}
            />

            <Table
                className={styles.table}
                striped
                highlightOnHover
                withTableBorder
                withRowBorders={false}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Transaction</Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th ta="right">Amount</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {tableBody}
                </Table.Tbody>

            </Table>
        </Card>
    )
}