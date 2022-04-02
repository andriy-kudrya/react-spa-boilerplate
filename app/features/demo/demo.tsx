import { useState } from '_/facade/hooks'
import HoverMenu from '_/components/overlay/hover-menu'
import NumberInput from '_/utils/input/number-input'
import DateInput from '_/utils/input/utc-date-input'
import { ValidatedInput, ValidatedValue } from '_/utils/input/validated-input'

function Demo() {
    const [cardCount, setCardCount] = useState<number | ''>('')
        , [dateAdded, setDateAdded] = useState<number | ''>('')
        , [value, setValue] = useState<ValidatedValue>('')
        , [hoverDiv, setHoverDiv] = useState<HTMLElement | null>(null)

    return (
        <div className='container'>
            Demo page
            <NumberInput value={cardCount} onChange={setCardCount} placeholder='Min cards...'/>
            <DateInput value={dateAdded} onChange={setDateAdded} placeholder='Min date added...'/>
            <br/>
            <ValidatedInput type='number' step='0.1' value={undefined} onChange={setValue}/>
            {JSON.stringify(value)}

            <div
                ref={setHoverDiv}
                style={{ border: '3px solid black', width: 100, height: 100 }}
            >
                Hover zone
            </div>

            <HoverMenu element={hoverDiv}>
                <div
                    id='inner'
                    style={{ border: '3px solid green', width: '100px', height: '100px' }}
                >
                    <div>
                        Menu menu
                    </div>
                </div>
            </HoverMenu>
        </div>
    )
}

export default Demo
