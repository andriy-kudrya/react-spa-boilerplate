import { React } from '_/facade/react'
import { useRef } from '_/facade/hooks'
import { omit } from '_/utils/object'

interface InvalidState extends Omit<ValidityState, 'valid'> {}

type ValidatedValue = string | InvalidState

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: ValidatedValue
    onChange?: (value: ValidatedValue, event: React.ChangeEvent<HTMLInputElement>) => void
}

const ValidatedInput = React.forwardRef(
    function ValidatedInput(props: Props, ref: React.Ref<HTMLInputElement>) {
        const lastValueRef = useRef<{ forward: ValidatedValue, target: string }>({ forward: '', target: '' })
            , forwardProps = omit(props, 'value', 'onChange', 'onInput')
            , value = props.value === undefined || typeof props.value === 'string'
                ? props.value
                : props.value === lastValueRef.current.forward
                    ? lastValueRef.current.target
                    : ''

        return <input ref={ref} {...forwardProps} onInput={handleInput} value={value}/>

        // Cannot handle validity change in onChange handler when first entered value is invalid.
        // So onInput is used for invalid states as a more reliable option.
        // E.g. there is number input, it is empty, then user type 'e' into it.
        // In that case onChange doesn't fire.
        function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
            if (props.onInput)
                props.onInput(event)

            const target = event.target
                , forwardValue = target.validity.valid ? target.value : planeValidityState(target.validity)

            lastValueRef.current = {
                forward: forwardValue,
                target: target.value,
            }

            if (props.onChange)
                props.onChange(forwardValue, event)
        }
    }
)

function isInvalidState(val: ValidatedValue): val is InvalidState {
    if (!(val instanceof Object))
        return false

    return 'badInput' in val
        && 'customError' in val
        && 'patternMismatch' in val
        && 'rangeOverflow' in val
        && 'rangeUnderflow' in val
        && 'stepMismatch' in val
        && 'tooLong' in val
        && 'tooShort' in val
        && 'typeMismatch' in val
        && 'valueMissing' in val
}

export { ValidatedInput, ValidatedValue, isInvalidState }

function planeValidityState(validity: ValidityState): InvalidState {
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
        valueMissing: validity.valueMissing,
    }
}
