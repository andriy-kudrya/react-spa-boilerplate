import createRouter, { Route } from 'router5'
import browserPlugin from 'router5/plugins/browser'
import { LOG_IN, CARDS } from '#/constants/routes'

const routes: Route[] = [
    {
        name: LOG_IN,
        path: '/log-in',
    },
    {
        name: CARDS,
        path: '/cards',
    },
]

const router = createRouter(routes, {
        defaultRoute: 'log-in',
    })
    .usePlugin(browserPlugin())

export default router
