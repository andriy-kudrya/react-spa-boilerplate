import { React, useAction, useSelector } from '#/facade/react'

import { Auth, Credentials } from '#/entities/auth'
import { noop } from '#/utils/function'

import * as actions from '../actions'
import AuthForm from './auth-form'

const Auth = () => {
    const logIn = useAction(actions.logIn)
        , auth = useSelector(_ => _.auth)

    return (
        <div>
            <AuthForm onSubmit={_ => logIn(_ as Credentials).then(noop)} />
            {auth.token &&
                <div>
                    Token = {auth.token}
                    <br />
                    Login = {auth.login}
                    <br />
                    Id = {auth.id}
                </div>
            }
        </div>
    )
}

export default Auth
