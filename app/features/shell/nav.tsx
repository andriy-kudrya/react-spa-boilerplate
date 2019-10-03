import { React, classnames } from '#/facade/react'
import { LOG_IN, CARDS } from '#/constants/routes'

import { Link, useRouter } from '#/utils/router'

const NavLink = (props: { routeName: string, children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <li className={classnames({ 'is-active': router.isActive(props.routeName) })}>
            <Link routeName={props.routeName} children={props.children}/>
        </li>
    )
}

const Nav = () =>
    <div className='top-bar'>
        <div className='top-bar-left'>
            <ul className='menu'>
                <li className='menu-text'>Card Viewer</li>
                <NavLink routeName={LOG_IN}>Log In</NavLink>
                <NavLink routeName={CARDS}>Cards</NavLink>
            </ul>
        </div>
    </div>

export default Nav
