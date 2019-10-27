import '#/styles/main.sass'

import * as React from 'react'
import { render } from 'react-dom'

import ReduxContext from '#/utils/redux/context'

import { RouterProvider } from '#/utils/router'
import Shell from '#/features/shell/shell'
import router from '#/features/routing/router'
import AppModuleLoaderContext from '#/module-loader/context'

import store, { appModuleLoader } from './store'

router.start()

render(
    <React.StrictMode>
        <AppModuleLoaderContext.Provider value={appModuleLoader}>
            <RouterProvider value={router}>
                <ReduxContext.Provider value={store}>
                        <Shell />
                </ReduxContext.Provider>
            </RouterProvider>
        </AppModuleLoaderContext.Provider>
    </React.StrictMode>,
    document.getElementById('app')
)
