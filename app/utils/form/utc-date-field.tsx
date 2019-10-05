import * as React from 'react'
import { useField } from 'react-final-form'

import DateInput from '../input/utc-date-input'

import { showFieldError } from './helpers'

interface InputFieldProps {
    id?: string
    name: string
    children?: React.ReactNode
}

const UtcDateField = (props: InputFieldProps) => {
    const field = useField(props.name)
    return (
        <div>
            <label htmlFor={props.id} children={props.children}/>
            <DateInput id={props.id} emptyValue='' {...field.input}/>
            {showFieldError(field.meta) && <span>{field.meta.error}</span>}
        </div>
    )
}

export default UtcDateField
