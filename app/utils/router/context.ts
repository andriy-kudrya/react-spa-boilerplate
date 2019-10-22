import { Router } from 'router5'
import { createContext, useContext, useState, useEffect } from 'react'

const RouterContext = createContext<Router>(undefined as any)
    , RouterProvider = RouterContext.Provider

function useRouter() {
    const router = useContext(RouterContext)
        , [, setState] = useState({})

    useEffect(
        () => router.subscribe(setState),
        [router]
    )

    return router
}

export { RouterProvider, useRouter }
