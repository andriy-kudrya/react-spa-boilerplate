import * as React from 'react'

import PaginationState from '#/entities/pagination-state'
import { bindComponent } from '#/utils/react'
import { shallowUpdate } from '#/utils/object'

import { Page } from './components'

interface Props {
    totalCount: number
    state: PaginationState
    onChange: (state: PaginationState) => void
}

class Pagination extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        bindComponent(this)
    }

    handlePageClick(page: number) {
        this.notifyPageChange(page)
    }

    handlePrevClick() {
        this.notifyPageChange(calcCurrentPage(this.props.state) - 1)
    }

    handleNextClick() {
        this.notifyPageChange(calcCurrentPage(this.props.state) + 1)
    }

    notifyPageChange(page: number) {
        const { state, onChange } = this.props
            , start = page * state.count
            , nextState = shallowUpdate(state, { start })

        onChange(nextState)
    }

    render() {
        const { state, totalCount } = this.props
            , currentPage = calcCurrentPage(state)
            , maxPage = totalCount > 0 ? Math.ceil(totalCount / state.count) - 1 : 0
            , pages = calcSuggestedPages(currentPage, maxPage)

        return (
            <nav>
                <ul className='pagination'>
                    <Page
                        page={NaN}
                        className='pagination-previous'
                        disabled={currentPage === 0}
                        onClick={this.handlePrevClick}
                    >Previous</Page>
                    {pages.map(_ =>
                        <Page
                            key={_}
                            page={_}
                            disabled={_ === currentPage}
                            active={_ === currentPage}
                            onClick={this.handlePageClick}
                        >{_ + 1}</Page>
                    )}
                    <Page
                        page={NaN}
                        className='pagination-next'
                        disabled={currentPage === maxPage}
                        onClick={this.handleNextClick}
                    >Next</Page>
                </ul>
            </nav>
        )
    }
}

export default Pagination

function calcCurrentPage(state: PaginationState): number {
    const count = state.count
        , start = state.start % count === 0 ? state.start : 0 // normalize start
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
