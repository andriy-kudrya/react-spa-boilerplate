import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'

import * as routeNames from '#/constants/routes'
import { omit } from '#/utils/object'

import middleware from './middleware'
import routes from './routes'

const router = createRouter(
        routes.map(_ => omit(_, 'access')),
        { defaultRoute: routeNames.LOG_IN }
    )
    .usePlugin(browserPlugin())
    .useMiddleware(middleware)

export default router
