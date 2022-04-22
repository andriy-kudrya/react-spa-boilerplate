import { cn } from '_/facade/react'
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
            , showError = showFieldError(field.meta)

        return (
            <div className='form-group'>
                <label htmlFor={props.id} children={props.children}/>
                <input className={cn('form-control', showError && 'is-invalid')} id={props.id} {...field.input} />
                {showError && <span className='invalid-feedback'>{field.meta.error}</span>}
            </div>
        )
    }

export default InputField

type ConcreteFieldProps = Pick<InputFieldProps, 'id' | 'name' | 'children'>

const TextField = (props: ConcreteFieldProps) =>
        <InputField {...props} type='text' />

const PasswordField = (props: ConcreteFieldProps) =>
        <InputField {...props} type='password' />

export { TextField, PasswordField }
