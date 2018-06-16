import { withRoute, Link } from 'react-router5'
import { State } from 'router5'
import { startsWithSegment } from 'router5-helpers'

import { React, classnames } from '#/utils/react'
import { LOG_IN, CARDS } from '#/constants/routes'

const NavLink = withRoute<{ route: State, routeName: string }>(
    ({ route, routeName, children }) =>
        <li className={classnames({ 'is-active': startsWithSegment(route, routeName) })}>
            <Link routeName={routeName} children={children}/>
        </li>
)

const Nav: React.SFC = () =>
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
