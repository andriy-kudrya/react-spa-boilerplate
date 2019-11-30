import wrappedInputFactory, { Value, prependZero } from './numeric-input-factory'

function formatValue<Empty>(value: Value<Empty>, empty: Empty): string {
    if (value === empty)
        return ''

    const date = new Date(value as number)

    return date.toISOString().substr(0, 10)
}

function parseValue<Empty>(value: string, empty: Empty): number | Empty {
    return value === '' ? empty : Date.parse(value)
}

function formatFallbackValue<Empty>(value: Value<Empty>, empty: Empty): string {
    if (value === empty)
        return ''

    const date = new Date(value as number)

    return ''
        + prependZero(date.getUTCDate(), 2) + '.'
        + prependZero(date.getUTCMonth() + 1, 2) + '.'
        + prependZero(date.getUTCFullYear(), 4)
}

function parseFallbackValue<Empty>(value: string, empty: Empty): number | Empty {
    const dateRegex = /(\d\d)\.(\d\d)\.(\d\d\d\d)/g
        , execResult = dateRegex.exec(value)

    if (execResult === null)
        return empty

    const date = Date.UTC(
        parseInt(execResult[3], 10),
        parseInt(execResult[2], 10) - 1,
        parseInt(execResult[1], 10)
    )

    return formatFallbackValue(date, empty) !== value ? empty : date
}

const UtcDateInput = wrappedInputFactory(
        'date',
        formatValue,
        formatFallbackValue,
        parseValue,
        parseFallbackValue
    )

export default UtcDateInput
