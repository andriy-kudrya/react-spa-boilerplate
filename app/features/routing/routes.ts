import createRouter, { Route } from 'router5'
import browserPlugin from 'router5/plugins/browser'

import * as routeNames from '#/constants/routes'

import middleware from './middleware'

const routes: Route[] = [
    {
        name: routeNames.LOG_IN,
        path: '/log-in',
    },
    {
        name: routeNames.CARDS,
        path: '/cards',
    },
]

const router = createRouter(routes, {
        defaultRoute: routeNames.LOG_IN,
    })
    .usePlugin(browserPlugin())
    .useMiddleware(middleware)

export default router
