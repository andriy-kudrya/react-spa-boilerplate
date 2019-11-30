import wrappedInputFactory, { NumericValue, prependZero, EMPTY_VALUE } from './numeric-input-factory'

function formatValue(value: NumericValue): string {
    if (value === EMPTY_VALUE)
        return ''

    const date = new Date(value)

    return ''
        + prependZero(date.getFullYear(), 4) + '-'
        + prependZero(date.getMonth() + 1, 2) + '-'
        + prependZero(date.getDate(), 2) + 'T'
        + prependZero(date.getHours(), 2) + ':'
        + prependZero(date.getMinutes(), 2)
}

function parseValue(value: string): NumericValue {
    return value === '' ? EMPTY_VALUE : Date.parse(value)
}

function formatFallbackValue(value: NumericValue): string {
    if (value === EMPTY_VALUE)
        return ''

    const date = new Date(value)

    return ''
        + prependZero(date.getDate(), 2) + '.'
        + prependZero(date.getMonth() + 1, 2) + '.'
        + prependZero(date.getFullYear(), 4) + ' '
        + prependZero(date.getHours(), 2) + ':'
        + prependZero(date.getMinutes(), 2)
}

function parseFallbackValue(value: string): NumericValue {
    const dateRegex = /(\d\d)\.(\d\d)\.(\d\d\d\d) (\d\d):(\d\d)/g
        , execResult = dateRegex.exec(value)

    if (execResult === null)
        return EMPTY_VALUE

    const date = new Date(
        parseInt(execResult[3], 10),
        parseInt(execResult[2], 10) - 1,
        parseInt(execResult[1], 10),
        parseInt(execResult[4], 10),
        parseInt(execResult[5], 10)
    ).getTime()

    return formatFallbackValue(date) !== value ? EMPTY_VALUE : date
}

const LocalDateTimeInput = wrappedInputFactory(
        'datetime-local',
        formatValue,
        formatFallbackValue,
        parseValue,
        parseFallbackValue
    )

export default LocalDateTimeInput
