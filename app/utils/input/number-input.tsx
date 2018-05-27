import * as React from 'react'
import { bindComponent } from '../react'
import { dropFields, Redefine } from '../object'

type Value<Empty> = number | Empty

interface NewNumberProps<Empty> {
    value: Value<Empty>
    emptyValue?: Empty
    onChange(_: Value<Empty>): void
}

type NumberProps<Empty> = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NewNumberProps<Empty>, 'type'>

function numberToString<Empty>(props: Readonly<NumberProps<Empty>>) {
    return props.value === props.emptyValue ? '' : props.value.toString()
}

class NumberInput<Empty> extends React.PureComponent<NumberProps<Empty>> {
    private _lastInputValue: string
    private _lastValue?: Value<Empty>

    constructor(props: NumberProps<Empty>) {
        super(props)
        bindComponent(this)

        this._lastValue = props.value
        this._lastInputValue = numberToString(props)
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const props = this.props
            , inputValue = event.target.value
            , number = inputValue === '' ? props.emptyValue : parseFloat(inputValue)

        this._lastInputValue = inputValue
        this._lastValue = number

        props.onChange(number!)
    }

    render() {
        const props = this.props
            , forwardedProps = dropFields(props, 'value', 'onChange', 'emptyValue')
            , number = props.value
            , inputValue = number === this._lastValue ? this._lastInputValue : numberToString(props)

        return (
            <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type='number'/>
        )
    }
}

export default NumberInput
