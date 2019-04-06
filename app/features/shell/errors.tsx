import { React, connect, stateMapper, dispatchMapper } from '#/facade/react'
import { removeError } from '#/features/error/actions'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

const Errors: React.SFC<StateProps & DispatchProps> =
    props => props.errors.length > 0
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

export default connect(mapStateToProps, mapDispatchToProps)(Errors)
