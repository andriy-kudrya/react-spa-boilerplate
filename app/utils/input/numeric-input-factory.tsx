import * as React from 'react'
import { memo, useRef, useState } from 'react'
import { omit } from '../object'

function testInputTypeSupport(type: string): boolean {
    const input = document.createElement('input')
    input.setAttribute('type', type)
    return input.type === type
}

function prependZero(value: number, expectedSize: number): string {
    let result = value.toString()

    while (result.length < expectedSize)
        result = '0' + result

    return result
}

type Value<Empty> = number | Empty

interface Format {
    <Empty>(value: Value<Empty>, empty: Empty): string
}

interface Parse {
    <Empty>(value: string, empty: Empty): number | Empty
}

function wrappedInputFactory(inputType: string, formatValue: Format, formatFallbackValue: Format, parseValue: Parse, parseFallbackValue: Parse) {
    const inputTypeSupported = testInputTypeSupport(inputType)
        , format = inputTypeSupported ? formatValue : formatFallbackValue
        , parse = inputTypeSupported ? parseValue : parseFallbackValue

    interface NewInputProps<Empty> {
        value: Value<Empty>
        emptyValue?: Empty
        onChange(_: Value<Empty>): void
    }

    type InputProps<Empty> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & NewInputProps<Empty>

    function WrappedInput<Empty>(props: InputProps<Empty>) {
        const formattedValue = format(props.value, props.emptyValue)
            , lastInputValue = useRef(formattedValue)
            , lastValue = useRef<Value<Empty> | undefined>(props.value)
            , [, forceUpdate] = useState({})

        function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
            const inputValue = event.target.value
                , number = parse(inputValue, props.emptyValue)

            lastInputValue.current = inputValue
            lastValue.current = number

            // todo: do not dispatch update when inputTypeSupported === false and empty value doesn't changed
            props.onChange(number!)

            if (!inputTypeSupported && number === props.emptyValue)
                forceUpdate({})
        }

        const forwardedProps = omit(props, 'value', 'onChange', 'emptyValue')
            , inputValue = props.value === lastValue.current
                ? lastInputValue.current
                : formattedValue

        return <input {...forwardedProps} value={inputValue} onChange={handleChange} type={inputType} />
    }

    return memo(WrappedInput)
}

export default wrappedInputFactory
export { Value, prependZero }
