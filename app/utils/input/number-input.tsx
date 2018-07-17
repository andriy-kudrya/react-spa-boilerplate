import wrappedInputFactory from './core'

type Value<Empty> = number | Empty

function formatValue<Empty>(value: Value<Empty>, empty: Empty) {
    return value === empty ? '' : value.toString()
}

function parseValue<Empty>(value: string, empty: Empty): number | Empty {
    const parsedValue = parseFloat(value)

    return isNaN(parsedValue) ? empty : parsedValue
}

const NumberInput = wrappedInputFactory(
    'number',
    formatValue,
    formatValue,
    parseValue,
    parseValue,
)

export default NumberInput
