import * as React from 'react'
import { useField } from 'react-final-form'
import { showFieldError } from './helpers'

type InputType = 'text' | 'password'

interface InputFieldProps {
    id?: string
    name: string
    type: InputType
    children?: React.ReactNode
}

const InputField = (props: InputFieldProps) => {
        const field = useField(props.name, { type: props.type })

        return (
            <div>
                <label htmlFor={props.id} children={props.children}/>
                <input id={props.id} {...field.input} />
                {showFieldError(field.meta) && <span>{field.meta.error}</span>}
            </div>
        )
    }

export default InputField

type ConcreteFieldProps = Pick<InputFieldProps, 'id' | 'name' | 'children'>

const TextField = (props: ConcreteFieldProps) =>
        <InputField {...props} type='text' />

const PasswordField: React.SFC<ConcreteFieldProps> = (props: ConcreteFieldProps) =>
        <InputField {...props} type='password' />

export { TextField, PasswordField }
