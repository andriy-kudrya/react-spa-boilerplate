import * as React from 'react'
import { useField } from 'react-final-form'

import NumberInput from '#/utils/input/number-input'

import { showFieldError } from './helpers'

interface InputFieldProps {
    id?: string
    name: string
    children?: React.ReactNode
}

const NumberField = (props: InputFieldProps) => {
        const field = useField(props.name)
        return (
            <div>
                <label htmlFor={props.id} children={props.children}/>
                <NumberInput id={props.id} {...field.input}/>
                {showFieldError(field.meta) && <span>{field.meta.error}</span>}
            </div>
        )
    }

export default NumberField
