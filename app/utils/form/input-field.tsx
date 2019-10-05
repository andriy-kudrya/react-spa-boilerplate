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

type ConcreteFieldProps = Pick<InputFieldProps, 'id' | 'name'>

const TextField: React.SFC<ConcreteFieldProps> = ({id, name, children}) =>
    <InputField id={id} name={name} type='text' children={children} />

const PasswordField: React.SFC<ConcreteFieldProps> = ({id, name, children}) =>
    <InputField id={id} name={name} type='password' children={children} />

export { TextField, PasswordField }
