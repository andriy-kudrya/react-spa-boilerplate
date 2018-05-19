import * as React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'

import Shell from '#/features/shell/shell'

import store from './store'
import router from './routes'

router.start()

render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <Shell />
        </RouterProvider>
    </Provider>,
    document.getElementById('app')
)
