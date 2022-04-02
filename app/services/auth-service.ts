import type { Credentials, Auth } from '_/entities/auth'

interface AuthService {
    logIn(credentials: Credentials): Promise<Auth>
}

export default AuthService
