import { cn } from '_/facade/react'
import { useAccess } from '_/facade/hooks'
import * as routes from '_/constants/routes'
import * as access from '_/constants/access'

import { Link, useRouter } from '_/utils/router'

interface NavLinkProps {
    routeName: string
    access: access.Access
    children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
    const router = useRouter()
        , access = useAccess(props.access)
        , active = router.isActive(props.routeName)

    if (!access)
        return null

    return (
        <li className={cn`nav-item ${active}active`}>
            <Link className='nav-link' routeName={props.routeName}>
                {props.children} {active && <span className='sr-only'>(current)</span>}
            </Link>
        </li>
    )
}

function Nav() {
    return (
        <nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
            <div className='navbar-brand'>Card viewer</div>
            <ul className='navbar-nav'>
                <NavLink routeName={routes.LOG_IN} access={access.LOG_IN}>Log In</NavLink>
                <NavLink routeName={routes.CARDS} access={access.VIEW_CARDS}>Cards</NavLink>
                <NavLink routeName={routes.DEMO} access={access.DEMO}>Demo</NavLink>
            </ul>
        </nav>
    )
}

export default Nav
