import type AppState from '#/entities/app-state'
// imported from utils just to brake circular dependencies with facade/hooks
import { useSelector } from '#/utils/redux/context'
import type { Access } from '#/constants/access'

export function useAccess(access: Access) {
    return useSelector((_: AppState) => _.access[access])
}
