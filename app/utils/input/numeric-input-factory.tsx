import * as React from 'react'
import { memo, forwardRef, useRef } from 'react'
import useForceUpdate from '../react/use-force-update'
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

const EMPTY_VALUE = '' as const

type NumericValue = number | ''

interface Format {
    (value: NumericValue): string
}

interface Parse {
    (value: string): NumericValue
}

function wrappedInputFactory(inputType: string, formatValue: Format, formatFallbackValue: Format, parseValue: Parse, parseFallbackValue: Parse) {
    const inputTypeSupported = testInputTypeSupport(inputType)
        , format = inputTypeSupported ? formatValue : formatFallbackValue
        , parse = inputTypeSupported ? parseValue : parseFallbackValue

    interface NewInputProps {
        value: NumericValue
        onChange(_: NumericValue): void
    }

    type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & NewInputProps

    function WrappedInput(props: InputProps, ref: React.Ref<HTMLInputElement>) {
        const formattedValue = format(props.value)
            , lastInputValue = useRef(formattedValue)
            , lastValue = useRef<NumericValue | undefined>(props.value)
            , forceUpdate = useForceUpdate()

        function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
            const inputValue = event.target.value
                , number = parse(inputValue)

            lastInputValue.current = inputValue
            lastValue.current = number

            // todo: do not dispatch update when inputTypeSupported === false and empty value doesn't changed
            props.onChange(number)

            if (!inputTypeSupported && number === EMPTY_VALUE)
                forceUpdate()
        }

        const forwardedProps = omit(props, 'value', 'onChange')
            , inputValue = props.value === lastValue.current
                ? lastInputValue.current
                : formattedValue

        return <input ref={ref} {...forwardedProps} value={inputValue} onChange={handleChange} type={inputType} />
    }

    return memo(forwardRef(WrappedInput))
}

export default wrappedInputFactory
export { NumericValue, prependZero, EMPTY_VALUE }
