export function capitalize(str: string): string {
    if (!str) return ''
    return str[0].toUpperCase() + str.slice(1)
}

export function intToCurrency(amount: int): string {
    let str = amount.toString()

    // If negative, remove it and add at the end
    let negative = false
    if (str[0] === '-') {
        negative = true
        str = str.slice(1)
    }

    const cents = str.slice(-2)
    const dollars = Number(str.slice(0, -2)).toLocaleString()

    return `${negative ? '-' : ''} $${dollars}${cents == '0' ? '' : `.${cents}`}`
}

export function dateFormat(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}