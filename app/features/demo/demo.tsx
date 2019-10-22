import { React } from '#/facade/react'
import { useState } from '#/facade/hooks'
import NumberInput from '#/utils/input/number-input'
import DateInput from '#/utils/input/utc-date-input'

function Demo() {
    const [cardCount, setCardCount] = useState<number>()
        , [dateAdded, setDateAdded] = useState<number>()

    return (
        <div className='container'>
            Demo page
            <NumberInput value={cardCount} onChange={setCardCount} placeholder='Min cards...'/>
            <DateInput value={dateAdded} onChange={setDateAdded} placeholder='Min date added...'/>
        </div>
    )
}

export default Demo
