import * as React from 'react'
import { bindComponent } from '../react'
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

    while (true) {
        if (result.length >= expectedSize)
            return result

        result = '0' + result
    }
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

    class WrappedInput<Empty> extends React.PureComponent<InputProps<Empty>> {
        private _lastInputValue: string
        private _lastValue?: Value<Empty>

        constructor(props: InputProps<Empty>) {
            super(props)
            bindComponent(this)

            this._lastValue = props.value
            this._lastInputValue = inputTypeSupported
                ? formatValue(props.value, props.emptyValue)
                : formatFallbackValue(props.value, props.emptyValue)
        }

        handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
            const props = this.props
                , inputValue = event.target.value
                , number = inputTypeSupported
                    ? parseValue(inputValue, props.emptyValue)
                    : parseFallbackValue(inputValue, props.emptyValue)

            this._lastInputValue = inputValue
            this._lastValue = number

            props.onChange(number!)

            if (!inputTypeSupported)
                this.forceUpdate()
        }

        render() {
            const props = this.props
                , forwardedProps = dropFields(props, 'value', 'onChange', 'emptyValue')
                , inputValue = props.value === this._lastValue
                    ? this._lastInputValue
                    : inputTypeSupported
                        ? formatValue(props.value, props.emptyValue)
                        : formatFallbackValue(props.value, props.emptyValue)

            return inputTypeSupported
                ? <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type={inputType}/>
                : <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type='text'/>
        }
    }

    return WrappedInput
}

export default wrappedInputFactory
export { Value, prependZero }
