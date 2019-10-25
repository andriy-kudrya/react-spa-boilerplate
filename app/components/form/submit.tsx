import { React, classes } from '#/facade/react'

interface Props {
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}

const Submit = (props: Props) =>
    <button className={classes('btn btn-primary', props.className)} type='submit' disabled={props.disabled} children={props.children} />

export default Submit
