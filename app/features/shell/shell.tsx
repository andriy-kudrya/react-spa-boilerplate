import * as React from 'react'

import { withRoute, Link } from 'react-router5'
import { State } from 'router5'

import Auth from '#/features/auth/auth'
import SteamCards from '#/features/cards/card-list'

const Shell: React.SFC<{ route: State}> =
    props =>
        <div>
            <ul>
                <li><Link routeName='log-in'>Log In</Link></li>
                <li><Link routeName='cards'>Cards</Link></li>
            </ul>
            <hr/>
            {renderRoute(props.route)}
        </div>

function renderRoute(route: State): React.ReactNode {
    switch (route.name) {
        case 'log-in':
            return <Auth/>

        case 'cards':
            return <SteamCards/>

        default:
            return null
    }
}

export default withRoute(Shell)
