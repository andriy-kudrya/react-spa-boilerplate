import { required, FormValue, ValidationResult } from '#/components/form/validate'
import type { Credentials } from '#/entities/auth'

export default function validate(entity: FormValue<Credentials>): ValidationResult<Credentials> {
    const login = required('Name')(entity.login)
        , password = required('Password')(entity.password)
        , result: ValidationResult<Credentials> = {}

    if (login)
        result.login = login

    if (password)
        result.password = password

    return result
}
