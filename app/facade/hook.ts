export { useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo } from 'react'

import { useSelector as useSelectorGeneric } from 'react-redux'
export const useSelector: <T>(selector: (state: AppState) => T, equalityFn?: (left: T, right: T) => boolean) => T = useSelectorGeneric

import { Access } from '#/constants/access'
export function useAccess(access: Access) {
    return useSelector(_ => _.access[access])
}

import AppState from '#/entities/app-state'
