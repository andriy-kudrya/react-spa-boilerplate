import * as access from '#/constants/access'

type Access = {
    [_ in access.Access]: boolean
}

export default Access
