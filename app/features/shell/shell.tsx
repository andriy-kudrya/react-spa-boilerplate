import { State as RouterState } from 'router5'

import { React } from '#/facade/react'
import { useContext, useSelector } from '#/facade/hooks'
import { LOG_IN, CARDS } from '#/constants/routes'

import Nav from './nav'
import Errors from './errors'
import AppModuleLoaderContext from '#/module-loader/context'
import { AppModuleLoader } from '#/module-loader/types'

const Shell = () => {
    const loader = useContext(AppModuleLoaderContext)
        , route = useSelector(_ => _.router.route!)

    return (
        <div>
            <Nav />
            <Errors />
            <React.Suspense fallback={'Loading...'}>
                {renderRoute(route, loader)}
            </React.Suspense>
        </div>
    )
}

function renderRoute(route: RouterState, loader: AppModuleLoader): React.ReactNode {
    if (route == null)
        return null

    switch (route.name) {
        case LOG_IN: {
            const Auth = loader.loadAuth()
            return <Auth />
        }
        case CARDS: {
            const Cards = loader.loadCards()
            return <Cards />
        }
        default:
            return null
    }
}

export default Shell
