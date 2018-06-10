import * as React from 'react'
import * as classnames from 'classnames'

interface PageProps {
    page: number
    onClick: (page: number) => void
    disabled: boolean
    active?: boolean
}

const Page: React.SFC<PageProps> = ({ page, disabled, active, onClick, children }) =>
    <li
        style={{ display: 'inline-block' }}
        className={classnames('page-item', { disabled: disabled && !active, active })}
    >
        <a
            style={{ color: active ? 'red' : 'black' }}
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
        &nbsp;
    </li>

export { Page }
