import * as React from 'react'
import { bindComponent } from '#/utils/react'
import { dropFields, Redefine } from '#/utils/object'

type Value = number | undefined

interface NewNumberProps {
    value: Value
    onChange(_: Value): void
}

type NumberProps = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NewNumberProps, 'type'>

function numberToString(number: Value) {
    return number === undefined ? '' : number.toString()
}

class NumberInput extends React.Component<NumberProps> {
    private _lastInputValue: string
    private _lastValue: Value

    constructor(props: NumberProps) {
        super(props)
        bindComponent(this)

        this._lastValue = props.value
        this._lastInputValue = numberToString(props.value)
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const inputValue = event.target.value
            , number = inputValue === '' ? undefined : parseFloat(inputValue)

        this._lastInputValue = inputValue
        this._lastValue = number

        this.props.onChange(number)
    }

    render() {
        const props = this.props
            , forwardedProps = dropFields(props, 'value', 'onChange')
            , number = props.value
            , inputValue = number === this._lastValue ? this._lastInputValue : numberToString(number)

        return (
            <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type='number'/>
        )
    }
}

export default NumberInput
