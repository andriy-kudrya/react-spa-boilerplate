import * as React from 'react'

interface SubmitProps {
    disabled?: boolean
}

const Submit: React.SFC<SubmitProps> = ({children, disabled}) =>
    <button type='submit' disabled={disabled}>{children}</button>

export default Submit