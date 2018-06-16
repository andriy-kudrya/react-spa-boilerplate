import { State as RouterState } from 'router5'

import { React, connect } from '#/utils/react'
import State from '#/entities/state'
import Auth from '#/features/auth/auth'
import SteamCards from '#/features/cards/card-list'

import Nav from './nav'

interface StateProps {
    route: RouterState
}

const Shell: React.SFC<StateProps> = props =>
        <div>
            <Nav />
            {renderRoute(props.route)}
        </div>

function renderRoute(route: RouterState): React.ReactNode {
    switch (route.name) {
        case 'log-in':
            return <Auth/>

        case 'cards':
            return <SteamCards/>

        default:
            return null
    }
}

function mapStateToProps(state: State): StateProps {
    return {
        route: state.router.route!,
    }
}

export default connect(mapStateToProps)(Shell)
