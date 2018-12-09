import { State as RouterState } from 'router5'

import { React, connect } from '#/facade/react'
import AppState from '#/entities/app-state'
import { LOG_IN, CARDS } from '#/constants/routes'

import Nav from './nav'
import Errors from './errors'
import { AppModuleLoaderConsumer } from '#/module-loader/context'
import { AppModuleLoader } from '#/module-loader/types'

interface StateProps {
    route: RouterState
}

const Shell: React.SFC<StateProps> = props =>
    <div>
        <Nav />
        <Errors />
        <React.Suspense fallback={'Loading...'}>
            <AppModuleLoaderConsumer
                children={_ => renderRoute(props.route, _)}
            />
        </React.Suspense>
    </div>

function renderRoute(route: RouterState, loader: AppModuleLoader): React.ReactNode {
    if (route == null)
        return null

    switch (route.name) {
        case LOG_IN:
            const Auth = loader.loadAuth()
            return <Auth />

        case CARDS:
            const Cards = loader.loadCards()
            return <Cards />

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
