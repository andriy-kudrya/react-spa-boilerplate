import wrappedInputFactory, { Value, prependZero } from './core'

function formatValue<Empty>(value: Value<Empty>, empty: Empty): string {
    if (value === empty)
        return ''

    const date = new Date(value as number)

    return ''
        + prependZero(date.getFullYear(), 4) + '-'
        + prependZero(date.getMonth() + 1, 2) + '-'
        + prependZero(date.getDate(), 2) + 'T'
        + prependZero(date.getHours(), 2) + ':'
        + prependZero(date.getMinutes(), 2)
}

function parseValue<Empty>(value: string, empty: Empty): number | Empty {
    return value === '' ? empty : Date.parse(value)
}

function formatFallbackValue<Empty>(value: Value<Empty>, empty: Empty): string {
    if (value === empty)
        return ''

    const date = new Date(value as number)

    return ''
        + prependZero(date.getDate(), 2) + '.'
        + prependZero(date.getMonth() + 1, 2) + '.'
        + prependZero(date.getFullYear(), 4) + ' '
        + prependZero(date.getHours(), 2) + ':'
        + prependZero(date.getMinutes(), 2)
}

function parseFallbackValue<Empty>(value: string, empty: Empty): number | Empty {
    const dateRegex = /(\d\d)\.(\d\d)\.(\d\d\d\d) (\d\d):(\d\d)/g
        , execResult = dateRegex.exec(value)

    if (execResult === null)
        return empty

    const date = new Date(
        parseInt(execResult[3], 10),
        parseInt(execResult[2], 10) - 1,
        parseInt(execResult[1], 10),
        parseInt(execResult[4], 10),
        parseInt(execResult[5], 10)
    ).getTime()

    return formatFallbackValue(date, empty) !== value ? empty : date
}

const LocalDateTimeInput = wrappedInputFactory(
        'datetime-local',
        formatValue,
        formatFallbackValue,
        parseValue,
        parseFallbackValue
    )

export default LocalDateTimeInput
