import * as React from 'react'
import * as classnames from 'classnames'

interface PageProps {
    page: number
    onClick: (page: number) => void
    disabled: boolean
    active?: boolean
    className?: string
}

const Page: React.SFC<PageProps> = ({ page, disabled, active, onClick, className, children }) =>
    <li className={classnames(className, { disabled: disabled && !active, current: active })}>
        {isNaN(page) && disabled
            ? children
            : <a
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
        }
    </li>

export { Page }
