import { React } from '#/facade/react'
import { AppModuleLoader } from './types'

const { Provider, Consumer } = React.createContext<AppModuleLoader>(undefined as any)

export {
    Provider as AppModuleLoaderProvider,
    Consumer as AppModuleLoaderConsumer,
}