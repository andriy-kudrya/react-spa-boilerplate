import * as React from 'react'
import { StatelessComponent } from 'react'
import { Field } from 'react-final-form'

import DateInput from '../input/utc-date-input'

import { showFieldError } from './helpers'

interface InputFieldProps {
    id?: string
    name: string
}

const UtcDateField: StatelessComponent<InputFieldProps> = ({name, id, children}) =>
    <Field name={name} render={
        _ =>
            <div>
                <label htmlFor={id}>{children}</label>
                <DateInput id={id} emptyValue='' {..._.input}/>
                {showFieldError(_.meta) && <span>{_.meta.error}</span>}
            </div>
    }/>

export default UtcDateField
