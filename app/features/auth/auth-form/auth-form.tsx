import { Form } from 'react-final-form'

import { React } from '#/utils/react'
import { TextField, PasswordField, Submit, submitDisabled } from '#/utils/form'
import validate from './auth-form-validate'

interface OwnProps {
    onSubmit: (_: object) => Promise<void>
}

const AuthForm: React.SFC<OwnProps> = props =>
    <Form
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
