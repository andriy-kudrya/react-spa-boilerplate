import * as React from 'react'
import { StatelessComponent } from 'react'
import { Field, FieldRenderProps } from 'react-final-form'
import { showFieldError } from './helpers'

type InputType = 'text' | 'password'

interface InputProps extends FieldRenderProps {
    id?: string
    type: InputType
}

const Input: StatelessComponent<InputProps> = ({input, meta, id, type, children}) =>
    <div>
        <label htmlFor={id}>{children}</label>
        <input id={id} type={type} {...input} />
        {showFieldError(meta) && <span>{meta.error}</span>}
    </div>

interface InputFieldProps {
    id?: string
    name: string
    type: InputType
}

const InputField: StatelessComponent<InputFieldProps> = ({name, id, type, children}) =>
    <Field name={name} render={
        _ => <Input input={_.input} meta={_.meta} type={type} id={id}>{children}</Input>
    }/>

export default InputField

type ConcreteFieldProps = Pick<InputFieldProps, 'id' | 'name'>

const TextField: StatelessComponent<ConcreteFieldProps> =
    ({id, name, children}) => <InputField id={id} name={name} type={'text'} children={children} />

const PasswordField: StatelessComponent<ConcreteFieldProps> =
    ({id, name, children}) => <InputField id={id} name={name} type={'password'} children={children} />

export { TextField, PasswordField }