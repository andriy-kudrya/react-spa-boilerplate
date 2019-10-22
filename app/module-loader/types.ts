import { Reducer, Middleware } from 'redux'
import AppState from '#/entities/app-state'

type ReducerMap = {
    [P in keyof AppState]?: Reducer<AppState[P]>
}

interface AppModule {
    mainView?: React.ComponentType
    middlewares: Middleware[]
    reducer?: ReducerMap
}

interface AppModuleLoader {
    loadAuth(): React.ExoticComponent
    loadCards(): React.ExoticComponent
    loadDemo(): React.ExoticComponent
}

export { AppModule, ReducerMap, AppModuleLoader }
