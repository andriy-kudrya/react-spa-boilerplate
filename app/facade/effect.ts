import type AppState from '_/entities/app-state'
import { EffectsFactory, handler } from '_/utils/redux/effect'

interface AppEffectsFactory extends EffectsFactory<AppState> {}

export { handler, AppEffectsFactory as EffectsFactory }
