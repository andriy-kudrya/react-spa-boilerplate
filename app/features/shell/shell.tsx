import { State as RouterState } from 'router5'

import { React, connect, stateMapper } from '#/facade/react'
import Auth from '#/features/auth/auth-form/auth'
import { LOG_IN, CARDS } from '#/constants/routes'

import Nav from './nav'
import Errors from './errors'
import { AppModuleLoaderConsumer } from '#/module-loader/context'
import { AppModuleLoader } from '#/module-loader/types'

const Shell = (props: ConnectedProps) =>
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

const mapStateToProps = stateMapper(state => ({ route: state.router.route! }))
type ConnectedProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(Shell)
