import wrappedInputFactory, { NumericValue, EMPTY_VALUE } from './numeric-input-factory'

function formatValue(value: NumericValue) {
    return value === EMPTY_VALUE ? '' : value.toString()
}

function parseValue(value: string): NumericValue {
    const parsedValue = parseFloat(value)

    return isNaN(parsedValue) ? EMPTY_VALUE : parsedValue
}

const NumberInput = wrappedInputFactory(
    'number',
    formatValue,
    formatValue,
    parseValue,
    parseValue,
)

export default NumberInput
