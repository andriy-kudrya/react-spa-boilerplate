import { State as RouterState } from 'router5'

import { React, connect } from '#/facade/react'
import AppState from '#/entities/app-state'
import { LOG_IN, CARDS } from '#/constants/routes'

import Nav from './nav'
import Errors from './errors'

const LazyAuth = React.lazy(() => import('#/features/auth/auth-form/auth'))
    , LazyCards = React.lazy(() => import('#/features/cards/list/card-list'))

// import Auth from '#/features/auth/auth-form/auth'
// import SteamCards from '#/features/cards/list/card-list'
// import { delay } from '#/utils/timeout'
// const LazyAuth = React.lazy(() => delay(1000).then(() => ({ default: Auth })))
//     , LazyCards = React.lazy(() => delay(1000).then(() => ({ default: SteamCards })))

interface StateProps {
    route: RouterState
}

const Shell: React.SFC<StateProps> = props =>
    <div>
        <Nav />
        <Errors />
        <React.Suspense fallback={'Loading...'}>
            {renderRoute(props.route)}
        </React.Suspense>
    </div>

function renderRoute(route: RouterState): React.ReactNode {
    if (route == null)
        return null

    switch (route.name) {
        case LOG_IN:
            return <LazyAuth/>

        case CARDS:
            return <LazyCards/>

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
