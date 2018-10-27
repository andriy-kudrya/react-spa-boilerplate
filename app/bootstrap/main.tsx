import '#/styles/main.scss'

import * as React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import { RouterProvider } from '#/utils/router'
import Shell from '#/features/shell/shell'
import router from '#/features/routing/routes'

import store from './store'

router.start()

render(
    <RouterProvider value={router}>
        <Provider store={store}>
            <Shell />
        </Provider>
    </RouterProvider>,
    document.getElementById('app')
)
