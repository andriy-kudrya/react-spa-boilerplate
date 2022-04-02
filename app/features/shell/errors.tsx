import { useSelector, useAction } from '_/facade/hooks'
import Overlay from '_/components/overlay/overlay'
import * as actions from '_/features/error/actions'

const Errors = () => {
    const errors = useSelector(_ => _.errors)
        , removeError = useAction(actions.removeError)

    if (errors.length === 0)
        return null

    return (
        <Overlay top={60} left={20}>
            <div className='alert alert-danger alert-dismissible' role='alert'>
                {errors.map(
                    (err, idx) =>
                        <div key={idx}>
                            {err.message}
                        </div>
                )}
                <button type='button' className='close' aria-label='Close' onClick={_ => errors.forEach(removeError)}>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
        </Overlay>
    )
}

export default Errors
