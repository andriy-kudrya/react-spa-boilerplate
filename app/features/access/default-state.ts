import { Access } from '#/constants/access'

const defaultState: { [_ in Access]: boolean } = {
    logIn: true,
    viewCards: false,
}

export default defaultState
