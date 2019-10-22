import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'

import * as routeNames from '#/constants/routes'
import { omit } from '#/utils/object'

import accessMw from './middlewares/access'
import { adapter } from './middlewares/interface'

import errorPlugin from './plugins/error'

import routes from './routes'

const router = createRouter(
        routes.map(_ => omit(_, 'access')),
        { defaultRoute: routeNames.LOG_IN }
    )
    .usePlugin(browserPlugin())
    .useMiddleware(...[accessMw].map(adapter))

export default router

router.usePlugin(errorPlugin)
