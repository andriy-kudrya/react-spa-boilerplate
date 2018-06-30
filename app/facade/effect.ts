import State from '#/entities/state'
import { EffectsFactory, handler } from '#/utils/redux/effect'

interface AppEffectsFactory extends EffectsFactory<State> {}

export { handler, AppEffectsFactory as EffectsFactory }
