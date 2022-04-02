import type AppState from '_/entities/app-state'
// imported from utils just to brake circular dependencies with facade/hooks
import { useSelector } from '_/utils/redux/context'
import type { Access } from '_/constants/access'

export function useAccess(access: Access) {
    return useSelector((_: AppState) => _.access[access])
}
