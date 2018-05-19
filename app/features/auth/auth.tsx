import * as React from 'react'
import { connect } from 'react-redux'

import { Auth } from '#/entities/state'
import AuthData from '#/entities/auth-data'

import { logIn } from './redux/actions'
import AuthForm from './auth-form'

interface Props {
    logIn: (_: AuthData) => any
    auth: Auth
}

const Auth: React.SFC<Props> = ({ auth, logIn }) =>
    <div>
        <AuthForm onSubmit={_ => logIn(_).then((_: any) => undefined)} />
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

const mapStateToProps = (state: { auth: Auth }) => ({
    auth: state.auth
})

const mapDispatchToProps = { logIn }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)