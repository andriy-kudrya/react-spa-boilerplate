import type * as a from '#/constants/access'
import * as r from '#/constants/routes'
import type Access from '#/entities/access'

import routes from './routes'

const routeAccess = new Map<string, a.Access>(routes.map(_ => [_.name, _.access] as const))

function hasAccess(stateName: r.Routes, access: Access): boolean
function hasAccess(stateName: string, access: Access): boolean
function hasAccess(stateName: string, access: Access): boolean {
    const accessEnum = routeAccess.get(stateName)
    if (!accessEnum)
        return false

    return access[accessEnum]
}

const routePriority = [r.LOG_IN, r.CARDS] as const

function defaultRoute(access: Access): r.Routes {
    return routePriority.find(_ => hasAccess(_, access))!
}

export { hasAccess, defaultRoute }
