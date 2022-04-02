import type { Route } from 'router5'

import * as routeNames from '_/constants/routes'
import * as access from '_/constants/access'

interface AppRoute extends Route {
    access: access.Access
    name: routeNames.Routes
}

const routes: AppRoute[] = [
    {
        name: routeNames.LOG_IN,
        path: '/log-in',
        access: access.LOG_IN,
    },
    {
        name: routeNames.CARDS,
        path: '/cards',
        access: access.VIEW_CARDS,
    },
    {
        name: routeNames.DEMO,
        path: '/demo',
        access: access.DEMO,
    },
]

export default routes
