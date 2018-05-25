import * as React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    //value: number
}

const Number: React.SFC<Props> = (_) =>
    <input {..._} type='number'/>

export default Number
