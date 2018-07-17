import wrappedInputFactory from './core'

type Value<Empty> = number | Empty

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
        , day = date.getUTCDate()
        , month = date.getUTCMonth() + 1
        , year = date.getUTCFullYear()

    return prependZero(day, 2) + '.' + prependZero(month, 2) + '.' + prependZero(year, 4)

    function prependZero(value: number, expectedSize: number): string {
        let result = value.toString()

        while (true) {
            if (result.length >= expectedSize)
                return result

            result = '0' + result
        }
    }
}

function parseFallbackValue<Empty>(value: string, empty: Empty): number | Empty {
    const dateRegex = /(\d\d)\.(\d\d)\.(\d\d\d\d)/g
        , execResult = dateRegex.exec(value)

    if (execResult === null)
        return empty

    const day = parseInt(execResult[1], 10)
        , month = parseInt(execResult[2], 10)
        , year = parseInt(execResult[3], 10)
        , date = Date.UTC(year, month - 1, day)

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
