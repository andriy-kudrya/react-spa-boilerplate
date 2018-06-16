import { withRoute } from 'react-router5'
import { State } from 'router5'

import { React } from '#/utils/react'
import Auth from '#/features/auth/auth'
import SteamCards from '#/features/cards/card-list'

import Nav from './nav'

const Shell: React.SFC<{ route: State}> =
    props =>
        <div>
            <Nav />
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
