import createRouter, { Route } from 'router5'
import browserPlugin from 'router5/plugins/browser'

const routes: Route[] = [
    {
        name: 'log-in',
        path: '/log-in',
    },
    {
        name: 'packages',
        path: '/packages',
    },
    {
        name: 'packages.create',
        path: '/packages/create',
    },
    {
        name: 'cards',
        path: '/cards',
    },
]

const router = createRouter(routes, {
        defaultRoute: 'log-in',
    })
    .usePlugin(browserPlugin())

export default router
