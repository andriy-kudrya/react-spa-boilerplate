import { React } from '#/facade/react'
import { UP_POINTING_TRIANGLE, DOWN_POINTING_TRIANGLE } from '#/constants/characters'

import { SortTarget } from '#/utils/sort'

const Header: React.SFC<{ name: string}> = ({ name, children }) =>
        <SortTarget name={name} children={_ =>
            <th onClick={_.onClick}>
                {children} {_.sorted && (_.ascending ? UP_POINTING_TRIANGLE : DOWN_POINTING_TRIANGLE)}
            </th>
        }/>

export default Header
