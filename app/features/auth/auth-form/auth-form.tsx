import { Form } from 'react-final-form'

import { TextField, PasswordField, Submit, submitDisabled } from '_/components/form'
import validate from './auth-form-validate'
import type { Credentials } from '_/entities/auth'

interface OwnProps {
    onSubmit: (_: Credentials) => Promise<void>
}

const AuthForm = (props: OwnProps) =>
    <Form<any>
        onSubmit={props.onSubmit}
        validate={validate}
        render={form =>
            <form onSubmit={form.handleSubmit}>
                <TextField name='login'>Name</TextField>
                <PasswordField name='password'>Password</PasswordField>

                <Submit disabled={submitDisabled(form)}>Log In</Submit>
            </form>
        }
    />

export default AuthForm
