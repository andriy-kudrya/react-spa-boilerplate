import { React, classes } from '#/facade/react'

interface PageProps {
    page: number
    onClick: (page: number) => void
    disabled: boolean
    active?: boolean
    children?: React.ReactNode
}

const Page = ({ page, disabled, active, onClick, children }: PageProps) =>
    <li className={classes('page-item', disabled && !active && 'disabled', active && 'active')}>
        <a
            href='#'
            className='page-link'
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
