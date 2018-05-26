import * as React from 'react'
import { bindComponent } from '#/utils/react'
import { dropFields, Redefine } from '#/utils/object'

type Value<Empty> = number | Empty

interface NewNumberProps<Empty> {
    value: Value<Empty>
    emptyValue?: Empty
    onChange(_: Value<Empty>): void
}

type NumberProps<Empty> = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NewNumberProps<Empty>, 'type'>

class NumberInput<Empty> extends React.Component<NumberProps<Empty>> {
    private _lastInputValue: string
    private _lastValue?: Value<Empty>

    constructor(props: NumberProps<Empty>) {
        super(props)
        bindComponent(this)

        this._lastValue = props.value
        this._lastInputValue = this.numberToString(props)
    }

    numberToString(props: NumberProps<Empty>) {
        return props.value === props.emptyValue ? '' : props.value.toString()
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const inputValue = event.target.value
            , number = inputValue === '' ? this.props.emptyValue : parseFloat(inputValue)

        this._lastInputValue = inputValue
        this._lastValue = number

        this.props.onChange(number!)
    }

    render() {
        const props = this.props
            , forwardedProps = dropFields(props, 'value', 'onChange', 'emptyValue')
            , number = props.value
            , inputValue = number === this._lastValue ? this._lastInputValue : this.numberToString(props)

        return (
            <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type='number'/>
        )
    }
}

export default NumberInput
