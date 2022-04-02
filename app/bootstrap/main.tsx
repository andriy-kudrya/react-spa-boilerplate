import '#/styles/main.sass'

import * as React from 'react'
import * as dom from 'react-dom/client'

import ReduxContext from '#/utils/redux/context'

import { RouterProvider } from '#/utils/router'
import Shell from '#/features/shell/shell'
import router from '#/features/routing/router'
import AppModuleLoaderContext from '#/module-loader/context'

import store, { appModuleLoader } from './store'

router.start()

// todo: remove cast to any when @types/react-dom is updated
const root = (dom as any).createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <ReduxContext.Provider value={store}>
            <AppModuleLoaderContext.Provider value={appModuleLoader}>
                <RouterProvider value={router}>
                    <Shell />
                </RouterProvider>
            </AppModuleLoaderContext.Provider>
        </ReduxContext.Provider>
    </React.StrictMode>
)
