import * as React from 'react'
import * as classnames from 'classnames'

interface PageProps {
    page: number
    onClick: (page: number) => void
    disabled: boolean
    active?: boolean
}

const Page: React.SFC<PageProps> = ({ page, disabled, active, onClick, children }) =>
    <li className={classnames('page-item', { disabled: disabled && !active, active })} style={{display: 'inline-block'}}>
        <a
            className='page-link'
            href='#'
            tabIndex={disabled && !active ? -1 : undefined}
            onClick={e => {
                e.preventDefault()
                if (!disabled)
                    onClick(page)
            }}
        >
            {children}
        </a>
    </li>

export { Page }
