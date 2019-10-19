import '#/styles/main.sass'

import * as React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import { RouterProvider } from '#/utils/router'
import Shell from '#/features/shell/shell'
import router from '#/features/routing/router'
import AppModuleLoaderContext from '#/module-loader/context'

import store, { appModuleLoader } from './store'

router.start()

render(
    <AppModuleLoaderContext.Provider value={appModuleLoader}>
        <RouterProvider value={router}>
            <Provider store={store}>
                <Shell />
            </Provider>
        </RouterProvider>
    </AppModuleLoaderContext.Provider>,
    document.getElementById('app')
)
