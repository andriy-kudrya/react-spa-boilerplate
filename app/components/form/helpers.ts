import { FormRenderProps, FieldRenderProps } from 'react-final-form'
import { getIn } from 'final-form'

function showFieldError(meta: FieldRenderProps<unknown, HTMLElement>['meta']): boolean {
    return !!(meta.invalid && meta.touched)
}

function hasShownErrors(props: FormRenderProps): boolean {
    const touched = props.touched
        , paths = touched ? Object.keys(touched).filter(_ => touched[_]) : []

    return paths.some(_ => !!getIn(props.errors, _))
}

function submitDisabled(props: FormRenderProps) {
    return props.submitting || props.invalid && hasShownErrors(props)
}

export { submitDisabled, showFieldError }
