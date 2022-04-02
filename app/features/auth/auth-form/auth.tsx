import { useAction, useSelector } from '#/facade/hooks'

import { noop } from '#/utils/function'

import * as actions from '../actions'
import AuthForm from './auth-form'

const Auth = () => {
    const logIn = useAction(actions.logIn)
        , auth = useSelector(_ => _.auth)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto'>
                    <AuthForm onSubmit={_ => logIn(_).then(noop)} />
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
            </div>
        </div>
    )
}

export default Auth
