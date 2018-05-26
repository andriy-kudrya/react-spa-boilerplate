import * as React from 'react'
import { Field } from 'react-final-form'
import { showFieldError } from './helpers'

type InputType = 'text' | 'password'

interface InputFieldProps {
    id?: string
    name: string
    type: InputType
}

const InputField: React.SFC<InputFieldProps> = ({name, id, type, children}) =>
    <Field name={name} render={
        _ =>
            <div>
                <label htmlFor={id}>{children}</label>
                <input id={id} type={type} {..._.input} />
                {showFieldError(_.meta) && <span>{_.meta.error}</span>}
            </div>
    }/>

export default InputField

type ConcreteFieldProps = Pick<InputFieldProps, 'id' | 'name'>

const TextField: React.SFC<ConcreteFieldProps> = ({id, name, children}) =>
    <InputField id={id} name={name} type={'text'} children={children} />

const PasswordField: React.SFC<ConcreteFieldProps> = ({id, name, children}) =>
    <InputField id={id} name={name} type={'password'} children={children} />

export { TextField, PasswordField }
