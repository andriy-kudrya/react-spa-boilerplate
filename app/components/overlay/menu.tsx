import { useState, useLayoutEffect } from '#/facade/hooks'
import Overlay from './overlay'

interface Props {
    element: HTMLElement | null
    children?: React.ReactNode
    containerRef?: React.Ref<HTMLDivElement>
}

function Menu(props: Props) {
    const [position, setPosition] = useState<{top: number, left: number}>()
        , element = props.element

    useLayoutEffect(
        () => {
            if (!element) {
                setPosition(undefined)
                return
            }

            const rect = element.getBoundingClientRect()
                , top = rect.bottom
                , left = rect.left

            setPosition({ top, left })
        },
        [element]
    )

    if (!position)
        return null

    return (
        <Overlay {...position} containerRef={props.containerRef}>
            {props.children}
        </Overlay>
    )
}


export default Menu
