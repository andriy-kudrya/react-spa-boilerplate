import { required, ValidationResult } from '#/utils/form/validate'
import AuthData from '#/entities/auth-data'

export default function validate(entity: Partial<AuthData>) {
    const login = required('Name')(entity.login)
        , password = required('Password')(entity.password)
        , result: ValidationResult<AuthData> = {}

    if (login)
        result.login = login

    if (password)
        result.password = password

    return result
}