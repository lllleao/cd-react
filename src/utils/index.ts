export function brFunction(dates: string): {
    firstPart: string
    secondPart: string
} {
    const firstPart = dates.slice(0, 14)
    const secondPart = dates.slice(20, 37)
    return { firstPart, secondPart }
}

export function authentic(emailUser: string, numEmail?: string, name?: string, text?: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{3,}$/
    const emailIsValid = emailPattern.test(emailUser)
    const nameIsValid = name?.length === 0
    const numberIsValid = numEmail?.length === 16 || numEmail?.length === 0
    const messageIsValid = text?.length === 0

    return {
        emailIsValid,
        nameIsValid,
        numberIsValid,
        messageIsValid
    }
}
