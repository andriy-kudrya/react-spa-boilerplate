import { required, ValidationResult } from '#/components/form/validate'
import { Credentials } from '#/entities/auth'

export default function validate(entity: Partial<Credentials>) {
    const login = required('Name')(entity.login)
        , password = required('Password')(entity.password)
        , result: ValidationResult<Credentials> = {}

    if (login)
        result.login = login

    if (password)
        result.password = password

    return result
}
