import { State as RouterState } from 'router5'

import { React, connect } from '#/facade/react'
import AppState from '#/entities/app-state'
import Auth from '#/features/auth/auth-form/auth'
import { LOG_IN, CARDS } from '#/constants/routes'
import SteamCards from '#/features/cards/list/card-list'

import Nav from './nav'
import Errors from './errors'

interface StateProps {
    route: RouterState
}

const Shell: React.SFC<StateProps> = props =>
    <div>
        <Nav />
        <Errors />
        {renderRoute(props.route)}
    </div>

function renderRoute(route: RouterState): React.ReactNode {
    switch (route.name) {
        case LOG_IN:
            return <Auth/>

        case CARDS:
            return <SteamCards/>

        default:
            return null
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        route: state.router.route!,
    }
}

export default connect(mapStateToProps)(Shell)
