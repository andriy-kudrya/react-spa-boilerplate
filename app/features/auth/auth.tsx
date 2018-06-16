import { React, connect, compose } from '#/utils/react'

import State from '#/entities/state'
import { Auth, Credentials } from '#/entities/auth'
import { noop } from '#/utils/function'

import { logIn } from './redux/actions'
import AuthForm from './auth-form'

interface StateProps {
    auth: Auth
}

interface DispatchProps {
    logIn: (_: Credentials) => Promise<Auth>
}

const Auth: React.SFC<StateProps & DispatchProps> = ({ auth, logIn }) =>
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

function mapStateToProps(state: State): StateProps {
    return {
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        logIn: compose(dispatch, logIn),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
