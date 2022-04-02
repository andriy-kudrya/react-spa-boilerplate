import type { State as RouterState } from 'router5'

import { Suspense } from 'react'
import { useContext, useSelector } from '_/facade/hooks'
import * as routes from '_/constants/routes'

import Nav from './nav'
import Errors from './errors'
import AppModuleLoaderContext from '_/module-loader/context'
import type { AppModuleLoader } from '_/module-loader/types'

const Shell = () => {
    const loader = useContext(AppModuleLoaderContext)
        , route = useSelector(_ => _.router.route!)

    return (
        <div>
            <Nav />
            <Errors />
            <Suspense fallback={'Loading...'}>
                {renderRoute(route, loader)}
            </Suspense>
        </div>
    )
}

function renderRoute(route: RouterState, loader: AppModuleLoader): React.ReactNode {
    if (route == null)
        return null

    switch (route.name) {
        case routes.LOG_IN: {
            const Auth = loader.loadAuth()
            return <Auth />
        }
        case routes.CARDS: {
            const Cards = loader.loadCards()
            return <Cards />
        }
        case routes.DEMO: {
            const Demo = loader.loadDemo()
            return <Demo />
        }
        default:
            return null
    }
}

export default Shell
