import * as React from 'react'

import { withRoute, Link } from 'react-router5'
import { Route } from 'router5'

import Auth from '#/features/auth/auth'
import PackageList from '#/features/packages/list'
import PackageCreate from '#/features/packages/create'
import SteamCards from '#/features/cards/card-list'

const Shell: React.SFC<{ route: Route }> = props => {
    const routeName = props.route.name
        , routedComponent = 
            routeName === 'log-in' ? <Auth /> :
            routeName === 'packages' ? <PackageList /> :
            routeName === 'packages.create' ? <PackageCreate /> :
            routeName === 'cards' ? <SteamCards /> : null

    return ( 
        <div>
            <ul>
                <li><Link routeName="log-in">Log In</Link></li>
                <li><Link routeName="packages">Packages</Link></li>
                <li><Link routeName="packages.create">Create Package</Link></li>
                <li><Link routeName="cards">Cards</Link></li>
            </ul>
    
            <hr/>
    
            {routedComponent}
        </div>
    )
}

// todo: fix typings
export default withRoute(Shell as any)
