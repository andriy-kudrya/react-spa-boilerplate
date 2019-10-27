import { Router } from 'router5'
import { createContext, useContext, useLayoutEffect } from 'react'
import useForceUpdate from '../react/use-force-update'

const RouterContext = createContext<Router>(undefined as any)
    , RouterProvider = RouterContext.Provider

function useRouter() {
    const router = useContext(RouterContext)
        , forceUpdate = useForceUpdate()

    useLayoutEffect(
        () => {
            let disposed = false

            router.subscribe(() => {
                if (!disposed)
                    forceUpdate()
            })

            return () => { disposed = true }
        },
        [router, forceUpdate]
    )

    return router
}

export { RouterProvider, useRouter }
