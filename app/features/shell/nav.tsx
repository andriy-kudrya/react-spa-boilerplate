import { React, classnames } from '#/facade/react'
import { LOG_IN, CARDS } from '#/constants/routes'

import { Link, RouterConsumer } from '#/utils/router'

const NavLink: React.SFC<{ routeName: string }> = props =>
    <RouterConsumer children={_ =>
        <li className={classnames({ 'is-active': _.isActive(props.routeName) })}>
            <Link routeName={props.routeName} children={props.children}/>
        </li>
    }/>

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
