import { React, classnames } from '#/facade/react'

interface Props {
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}

const Submit = (props: Props) =>
    <button className={classnames('button', props.className)} type='submit' disabled={props.disabled} children={props.children} />

export default Submit
