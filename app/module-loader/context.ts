import { createContext } from 'react'
import type { AppModuleLoader } from './types'

const AppModuleLoaderContext = createContext<AppModuleLoader>(undefined as any)

export default AppModuleLoaderContext
