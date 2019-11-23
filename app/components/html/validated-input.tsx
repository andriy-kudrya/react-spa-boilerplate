import { React } from '#/facade/react'
import { useRef } from '#/facade/hooks'
import { omit } from '#/utils/object'

type ValidatedValue = string | ValidityState

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: ValidatedValue
    onChange?: (value: ValidatedValue, event: React.ChangeEvent<HTMLInputElement>) => void
}


function ValidatedInput(props: Props, ref: React.Ref<HTMLInputElement>) {
    const lastValueRef = useRef<{ forward: ValidatedValue, target: string }>({ forward: '', target: '' })
        , forwardProps = omit(props, 'value', 'onChange')
        , value = props.value === undefined || typeof props.value === 'string'
            ? props.value
            : props.value === lastValueRef.current.forward
                ? lastValueRef.current.target
                : ''

    return <input ref={ref} {...forwardProps} onChange={handleChange} value={value}/>

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target
            , validity = planeValidityState(target.validity)
            , forwardValue = validity.valid ? target.value : validity

        lastValueRef.current = {
            forward: forwardValue,
            target: target.value,
        }

        if (props.onChange)
            props.onChange(forwardValue, event)
    }
}

export default React.forwardRef(ValidatedInput)
export { ValidatedValue }

function planeValidityState(validity: ValidityState): ValidityState {
    return {
        badInput: validity.badInput,
        customError: validity.customError,
        patternMismatch: validity.patternMismatch,
        rangeOverflow: validity.rangeOverflow,
        rangeUnderflow: validity.rangeUnderflow,
        stepMismatch: validity.stepMismatch,
        tooLong: validity.tooLong,
        tooShort: validity.tooShort,
        typeMismatch: validity.typeMismatch,
        valid: validity.valid,
        valueMissing: validity.valueMissing,
    }
}
