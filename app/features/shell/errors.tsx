import { React, useSelector, useAction } from '#/facade/react'
import * as actions from '#/features/error/actions'

const Errors = () => {
    const errors = useSelector(_ => _.errors)
        , removeError = useAction(actions.removeError)

    if (errors.length === 0)
        return null

    return (
        <div>
            {errors.map((err, key) =>
                <div key={key}>
                    {err.message}
                    <button type='button' onClick={_ => removeError(err)}>
                        &times;
                    </button>
                </div>
            )}
        </div>
    )
}

export default Errors
