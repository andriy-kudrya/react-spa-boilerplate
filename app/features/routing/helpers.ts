import * as a from '#/constants/access'
import { Routes } from '#/constants/routes'
import Access from '#/entities/access'

import routes from './routes'

const routeAccess = new Map<string, a.Access>(routes.map(_ => [_.name, _.access] as const))

function hasAccess(stateName: Routes, access: Access): boolean
function hasAccess(stateName: string, access: Access): boolean
function hasAccess(stateName: string, access: Access): boolean {
    const accessEnum = routeAccess.get(stateName)
    if (!accessEnum)
        return false

    return access[accessEnum]
}

export { hasAccess }
