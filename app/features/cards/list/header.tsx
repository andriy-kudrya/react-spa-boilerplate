import { UP_POINTING_TRIANGLE, DOWN_POINTING_TRIANGLE } from '_/constants/characters'

import { useSort } from '_/utils/sort'

const Header = ({ name, children }: { name: string, children: React.ReactNode }) => {
    const sort = useSort(name)

    return (
        <th onClick={sort.onClick}>
            {children} {sort.sorted && (sort.ascending ? UP_POINTING_TRIANGLE : DOWN_POINTING_TRIANGLE)}
        </th>
    )
}

export default Header
