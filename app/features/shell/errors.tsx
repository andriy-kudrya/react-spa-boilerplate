import { React, connect } from '#/facade/react'
import AppError from '#/entities/app-error'
import AppState from '#/entities/app-state'
import { removeError } from '#/features/error/actions'

interface StateProps {
    errors: AppError[]
}

interface DispatchProps {
    removeError: typeof removeError
}

const Errors: React.SFC<StateProps & DispatchProps> =
    props => props.errors.length > 0
        ? <div>
            {props.errors.map(err =>
                <div>
                    {err.message}
                    <button type='button' onClick={_ => props.removeError(err)}>
                        &times;
                    </button>
                </div>
            )}
        </div>
        : null

function mapStateToProps(state: AppState): StateProps {
    return {
        errors: state.errors,
    }
}

const mapDispatchToProps = {
    removeError,
}

export default connect(mapStateToProps, mapDispatchToProps)(Errors)
