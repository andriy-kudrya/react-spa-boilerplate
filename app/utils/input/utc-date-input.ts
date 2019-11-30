import wrappedInputFactory, { NumericValue, prependZero, EMPTY_VALUE } from './numeric-input-factory'

function formatValue(value: NumericValue): string {
    if (value === EMPTY_VALUE)
        return ''

    const date = new Date(value)

    return date.toISOString().substr(0, 10)
}

function parseValue(value: string): NumericValue {
    return value === '' ? EMPTY_VALUE : Date.parse(value)
}

function formatFallbackValue(value: NumericValue): string {
    if (value === EMPTY_VALUE)
        return ''

    const date = new Date(value)

    return ''
        + prependZero(date.getUTCDate(), 2) + '.'
        + prependZero(date.getUTCMonth() + 1, 2) + '.'
        + prependZero(date.getUTCFullYear(), 4)
}

function parseFallbackValue(value: string): NumericValue {
    const dateRegex = /(\d\d)\.(\d\d)\.(\d\d\d\d)/g
        , execResult = dateRegex.exec(value)

    if (execResult === null)
        return EMPTY_VALUE

    const date = Date.UTC(
        parseInt(execResult[3], 10),
        parseInt(execResult[2], 10) - 1,
        parseInt(execResult[1], 10)
    )

    return formatFallbackValue(date) !== value ? EMPTY_VALUE : date
}

const UtcDateInput = wrappedInputFactory(
        'date',
        formatValue,
        formatFallbackValue,
        parseValue,
        parseFallbackValue
    )

export default UtcDateInput
