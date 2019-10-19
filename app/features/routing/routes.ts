import { Route } from 'router5'

import * as routeNames from '#/constants/routes'
import * as access from '#/constants/access'

interface AppRoute extends Route {
    access: access.Access
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
]

export default routes
