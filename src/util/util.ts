export function capitalize(str: string): string {
    if (!str) return ''
    return str[0].toUpperCase() + str.slice(1)
}

export function intToCurrency(amount: int): string {
    const str = amount.toString()

    const cents = str.slice(-2)
    const dollars = Number(str.slice(0, -2)).toLocaleString()

    return `$ ${dollars}.${cents}`
}