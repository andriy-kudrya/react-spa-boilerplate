import type * as access from '_/constants/access'

type Access = {
    [_ in access.Access]: boolean
}

export default Access
