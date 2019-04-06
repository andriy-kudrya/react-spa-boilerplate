import { React, connect, stateMapper, dispatchMapper } from '#/facade/react'
import { removeError } from '#/features/error/actions'

const Errors = (props: ConnectedProps) => props.errors.length > 0
    ? <div>
        {props.errors.map((err, key) =>
            <div key={key}>
                {err.message}
                <button type='button' onClick={_ => props.removeError(err)}>
                    &times;
                </button>
            </div>
        )}
    </div>
    : null

const mapStateToProps = stateMapper(state => ({ errors: state.errors }))
const mapDispatchToProps = dispatchMapper({ removeError })
type ConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Errors)
