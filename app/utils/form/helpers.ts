import { FormRenderProps, FieldRenderProps } from 'react-final-form'

function showFieldError(meta: FieldRenderProps<unknown, HTMLElement>['meta']): boolean {
    return !!(meta.invalid && meta.touched)
}

function formTouched(props: FormRenderProps): boolean {
    const touched = (props as any).touched
        , keys = Object.keys(touched)

    if (keys.length === 0)
        return false

    return keys.every(_ => touched[_])
}

function submitDisabled(props: FormRenderProps) {
    return props.submitting || props.invalid && formTouched(props)
}

export { formTouched, submitDisabled, showFieldError }
