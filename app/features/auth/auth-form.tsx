import * as React from 'react'
import { Form } from 'react-final-form'

import { TextField, PasswordField, Submit, submitDisabled } from '#/utils/form'

import validate from './auth-form-validate'
import { logIn } from './redux/actions'

interface AuthFormProps { 
    onSubmit: typeof logIn
}

const AuthForm: React.SFC<AuthFormProps> = props =>
    <Form
        onSubmit={props.onSubmit as any}
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
