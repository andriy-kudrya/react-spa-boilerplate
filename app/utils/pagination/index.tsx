import type PaginationState from '#/entities/pagination-state'
import { shallowUpdate } from '#/utils/object'

import { Page } from './components'

interface Props {
    totalCount: number
    state: PaginationState
    onChange: (state: PaginationState) => void
}

function Pagination(props: Props) {
    function handlePageClick(page: number) {
        notifyPageChange(page)
    }

    function handlePrevClick() {
        notifyPageChange(calcCurrentPage(props.state) - 1)
    }

    function handleNextClick() {
        notifyPageChange(calcCurrentPage(props.state) + 1)
    }

    function notifyPageChange(page: number) {
        const { state, onChange } = props
            , start = page * state.count
            , nextState = shallowUpdate(state, { start })

        onChange(nextState)
    }

    const { state, totalCount } = props
        , currentPage = calcCurrentPage(state)
        , maxPage = totalCount > 0 ? Math.ceil(totalCount / state.count) - 1 : 0
        , pages = calcSuggestedPages(currentPage, maxPage)

    return (
        <nav>
            <ul className='pagination'>
                <Page
                    page={NaN}
                    disabled={currentPage === 0}
                    onClick={handlePrevClick}
                >Previous</Page>
                {pages.map(
                    _ =>
                        <Page
                            key={_}
                            page={_}
                            disabled={_ === currentPage}
                            active={_ === currentPage}
                            onClick={handlePageClick}
                        >{_ + 1}</Page>
                )}
                <Page
                    page={NaN}
                    disabled={currentPage === maxPage}
                    onClick={handleNextClick}
                >Next</Page>
            </ul>
        </nav>
    )
}

export default Pagination

function calcCurrentPage(state: PaginationState): number {
    const count = state.count
        // align start position by item count boundary
        , start = state.start % count === 0 ? state.start : 0
        , currentPage = start / count

    return currentPage
}

function calcSuggestedPages(page: number, maxPage: number): number[]  {
    const MAX_LENGTH = 6
        , numbersAroundPage = sequence(page - Math.floor(MAX_LENGTH / 2), MAX_LENGTH)
        , firstNumber = numbersAroundPage[0]
        , lastNumber = numbersAroundPage[numbersAroundPage.length - 1]
        , leftAdjustedNumbers = firstNumber < 0
            ? numbersAroundPage.concat(sequence(lastNumber + 1, -firstNumber))
            : numbersAroundPage
        , rightAdjustedNumbers = lastNumber > maxPage
            ? sequence(firstNumber - lastNumber + maxPage, lastNumber - maxPage).concat(leftAdjustedNumbers)
            : leftAdjustedNumbers
        , result = rightAdjustedNumbers
            .filter(n => n >= 0)
            .filter(n => n <= maxPage)
            .filter((_, i) => i < MAX_LENGTH)

    return result
}

function sequence(start: number, count: number): number[] {
    const result: number[] = []

    for (let i = 0; i < count; i++)
        result.push(start + i)

    return result
}
