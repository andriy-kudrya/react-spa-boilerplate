import * as dom from 'react-dom/client'

import ReduxContext from '_/utils/redux/context'

import { RouterProvider } from '_/utils/router'
import Shell from '_/features/shell/shell'
import router from '_/features/routing/router'
import AppModuleLoaderContext from '_/module-loader/context'

import store, { appModuleLoader } from './store'

router.start()

const root = dom.createRoot(document.getElementById('app')!)

root.render(
    <ReduxContext.Provider value={store}>
        <AppModuleLoaderContext.Provider value={appModuleLoader}>
            <RouterProvider value={router}>
                <Shell />
            </RouterProvider>
        </AppModuleLoaderContext.Provider>
    </ReduxContext.Provider>
)
