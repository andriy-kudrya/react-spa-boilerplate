import * as React from 'react'

interface PaginationState {
    start: number // should be multiple of count
    count: number // equals to items per page
}

interface Props {
    totalCount: number
    state: PaginationState
}

class Pagination extends React.Component<Props> {
    render() {
        const { state, totalCount } = this.props
            , count = state.count
            , start = state.start % count === 0 ? state.start : 0 // normalize start
            , currentPage = start / count
            , maxPage = totalCount > 0 ? Math.ceil(totalCount / count) - 1 : 0
            , pages = calcSuggestedPages(currentPage, maxPage)

        return (
            <div>
                Pagination {currentPage + 1} of {maxPage + 1}
                <br/>
                {pages.map(_ => '.' + (_ + 1) + '.')}
            </div>
        )
    }
}

export default Pagination

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
    return Array.from({ length: count }, (_, i) => i + start)
}
