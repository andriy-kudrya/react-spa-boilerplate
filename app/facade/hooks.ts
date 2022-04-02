export { useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo, useRef } from 'react'
export { useAction } from '_/utils/redux/connect'
export { useAccess } from '_/features/access/hooks'

import { useSelector as useSelectorGeneric } from '_/utils/redux/context'
import type AppState from '_/entities/app-state'
export const useSelector: <T>(selector: (state: AppState) => T, equalityFn?: (left: T, right: T) => boolean) => T = useSelectorGeneric

