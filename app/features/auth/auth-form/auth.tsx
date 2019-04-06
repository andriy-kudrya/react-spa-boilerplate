import { React, connect, dispatchMapper, stateMapper } from '#/facade/react'

import { Auth, Credentials } from '#/entities/auth'
import { noop } from '#/utils/function'

import { logIn } from '../actions'
import AuthForm from './auth-form'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

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

const mapStateToProps = stateMapper(state => ({ auth: state.auth }))
const mapDispatchToProps = dispatchMapper({ logIn })

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
