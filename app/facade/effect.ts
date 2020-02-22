import type AppState from '#/entities/app-state'
import { EffectsFactory, handler } from '#/utils/redux/effect'

interface AppEffectsFactory extends EffectsFactory<AppState> {}

export { handler, AppEffectsFactory as EffectsFactory }
