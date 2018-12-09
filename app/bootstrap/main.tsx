import '#/styles/main.scss'

import * as React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import { RouterProvider } from '#/utils/router'
import Shell from '#/features/shell/shell'
import router from '#/features/routing/routes'
import { AppModuleLoaderProvider } from '#/module-loader/context'

import store, { appModuleLoader } from './store'

router.start()

render(
    <AppModuleLoaderProvider value={appModuleLoader}>
        <RouterProvider value={router}>
            <Provider store={store}>
                <Shell />
            </Provider>
        </RouterProvider>
    </AppModuleLoaderProvider>,
    document.getElementById('app')
)
