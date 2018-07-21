import AuthService from '../auth-service'
import { Credentials, Auth } from '#/entities/auth'
import { delay } from '#/utils/timeout'

function factory(): AuthService {
    return {
        logIn,
    }

    function logIn(credentials: Credentials): Promise<Auth> {
        return Promise.resolve()
            .then(delay)
            .then(_ => ({
                id: credentials.login,
                login: credentials.login,
                token: 'TODO: ababagalamaga',
            }))
    }
}

export default factory
