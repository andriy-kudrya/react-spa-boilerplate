import wrappedInputFactory, { Value } from './core'

function formatValue<Empty>(value: Value<Empty>, empty: Empty) {
    return value === empty ? '' : (value as number).toString()
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
