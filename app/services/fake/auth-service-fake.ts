import type AuthService from '../auth-service'
import type { Credentials, Auth } from '_/entities/auth'
import { delay } from '_/utils/timeout'

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
