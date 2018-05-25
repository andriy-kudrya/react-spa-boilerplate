import * as React from 'react'

// TODO: move somewhere
type Redefine<Target, Augmentation, Drop = never> =
    Augmentation & Pick<Target, Exclude<keyof Target, keyof Augmentation | Drop>>

function dropFields<T extends {}, F extends keyof T>(target: T, ...fields: F[]): Redefine<T, {}, F> {
    const result = Object.assign({}, target)
    fields.forEach(_ => delete result[_])
    return result
}

interface NumberProps {
    value: number | undefined
    onChange(_: number | undefined): void
}

type OwnProps = Redefine<React.InputHTMLAttributes<HTMLInputElement>, NumberProps, 'type'>

class NumberInput extends React.Component<OwnProps> {
    private _lastValue: string
    private _lastNumber: number | undefined

    constructor(props: OwnProps) {
        super(props)

        this.onChange = this.onChange.bind(this)

        this._lastNumber = props.value
        this._lastValue = props.value === undefined ? '' : props.value.toString()
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value
            , number = value === '' ? undefined : parseFloat(value)

        this._lastValue = value
        this._lastNumber = number

        this.props.onChange(number)
    }

    render() {
        const props = this.props
            , forwardedProps = dropFields(props, 'value', 'onChange')
            , number = props.value
            , value = number === this._lastNumber
                ? this._lastValue
                : number === undefined
                    ? ''
                    : number.toString()

        return (
            <input onChange={this.onChange} value={value} {...forwardedProps} type='number' />
        )
    }
}

export default NumberInput
