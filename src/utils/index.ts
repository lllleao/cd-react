export function brFunction(dates: string): {
    firstPart: string
    secondPart: string
} {
    const firstPart = dates.slice(0, 14)
    const secondPart = dates.slice(20, 37)
    return { firstPart, secondPart }
}
