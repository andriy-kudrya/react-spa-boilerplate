import * as React from 'react'
import { memo, useRef, useState } from 'react'
import { dropFields, Redefine } from '../object'

function testInputTypeSupport(type: string): boolean {
    const invalidValue = 'invalid value'
        , input = document.createElement('input')

    input.setAttribute('type', type)
    input.setAttribute('value', invalidValue)

    return input.value !== invalidValue
}

function prependZero(value: number, expectedSize: number): string {
    let result = value.toString()

    while (result.length < expectedSize)
        result = '0' + result

    return result
}

type Value<Empty> = number | Empty

interface NewInputProps<Empty> {
    value: Value<Empty>
    emptyValue?: Empty
    onChange(_: Value<Empty>): void
}

type InputProps<Empty> = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NewInputProps<Empty>, 'type'>

interface Format {
    <Empty>(value: Value<Empty>, empty: Empty): string
}

interface Parse {
    <Empty>(value: string, empty: Empty): number | Empty
}

function wrappedInputFactory(inputType: string, formatValue: Format, formatFallbackValue: Format, parseValue: Parse, parseFallbackValue: Parse) {
    const inputTypeSupported = testInputTypeSupport(inputType)

    function WrappedInput<Empty>(props: InputProps<Empty>) {
        const lastInputValue = useRef(
                inputTypeSupported
                    ? formatValue(props.value, props.emptyValue)
                    : formatFallbackValue(props.value, props.emptyValue)
            )
            , lastValue = useRef<Value<Empty> | undefined>(props.value)
            , [, forceUpdate] = useState({})

        function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
            const inputValue = event.target.value
                , number = inputTypeSupported
                    ? parseValue(inputValue, props.emptyValue)
                    : parseFallbackValue(inputValue, props.emptyValue)

            lastInputValue.current = inputValue
            lastValue.current = number

            // todo: do not dispatch update when inputTypeSupported === false and empty value doesn't changed
            props.onChange(number!)

            if (!inputTypeSupported && number === props.emptyValue)
                forceUpdate({})
        }

        const forwardedProps = dropFields(props, 'value', 'onChange', 'emptyValue')
            , inputValue = props.value === lastValue.current
                ? lastInputValue.current
                : inputTypeSupported
                    ? formatValue(props.value, props.emptyValue)
                    : formatFallbackValue(props.value, props.emptyValue)

        return inputTypeSupported
            ? <input {...forwardedProps} value={inputValue} onChange={handleChange} type={inputType}/>
            : <input {...forwardedProps} value={inputValue} onChange={handleChange} type='text'/>
    }

    return memo(WrappedInput)
}

export default wrappedInputFactory
export { Value, prependZero }
