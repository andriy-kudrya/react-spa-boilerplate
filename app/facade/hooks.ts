export { useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo, useRef } from 'react'
export { useAction } from '#/utils/redux/connect'
export { useAccess } from '#/features/access/hooks'

import { useSelector as useSelectorGeneric } from '#/utils/redux/context'
import type AppState from '#/entities/app-state'
export const useSelector: <T>(selector: (state: AppState) => T, equalityFn?: (left: T, right: T) => boolean) => T = useSelectorGeneric

