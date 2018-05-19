import { Credentials, Auth } from '#/entities/auth'

interface AuthService {
    logIn(credentials: Credentials): Promise<Auth>
}

export default AuthService