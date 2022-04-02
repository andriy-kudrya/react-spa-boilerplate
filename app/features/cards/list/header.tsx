import { UP_POINTING_TRIANGLE, DOWN_POINTING_TRIANGLE } from '#/constants/characters'

import { useSort } from '#/utils/sort'

const Header = ({ name, children }: { name: string, children: React.ReactNode }) => {
    const sort = useSort(name)

    return (
        <th onClick={sort.onClick}>
            {children} {sort.sorted && (sort.ascending ? UP_POINTING_TRIANGLE : DOWN_POINTING_TRIANGLE)}
        </th>
    )
}

export default Header
