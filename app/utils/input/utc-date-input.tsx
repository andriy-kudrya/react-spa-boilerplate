import * as React from 'react'
import { bindComponent } from '../react'
import { dropFields, Redefine } from '../object'

type Value<Empty> = number | Empty

interface NewUtcDateProps<Empty> {
    value: Value<Empty>
    emptyValue?: Empty
    onChange(_: Value<Empty>): void
}

type UtcDateProps<Empty> = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NewUtcDateProps<Empty>, 'type'>

function numberToString<Empty>(props: Readonly<UtcDateProps<Empty>>) {
    if (props.value === props.emptyValue)
        return ''

    const date = new Date(props.value as number)

    return date.toISOString().substr(0, 10)
}

class UtcDateInput<Empty> extends React.PureComponent<UtcDateProps<Empty>> {
    private _lastInputValue: string
    private _lastValue?: Value<Empty>

    constructor(props: UtcDateProps<Empty>) {
        super(props)
        bindComponent(this)

        this._lastValue = props.value
        this._lastInputValue = numberToString(props)
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const props = this.props
            , inputValue = event.target.value
            , number = inputValue === '' ? props.emptyValue : Date.parse(inputValue)

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
            <input {...forwardedProps} value={inputValue} onChange={this.handleChange} type='date'/>
        )
    }
}

export default UtcDateInput