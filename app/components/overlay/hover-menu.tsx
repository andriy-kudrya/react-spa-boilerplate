import { useState, useEffect } from '#/facade/hooks'

import * as dom from '#/utils/dom'

import Menu from './menu'

interface Props {
    element: HTMLElement | null
    children?: React.ReactNode
}

function HoverMenu(props: Props) {
    const [container, setContainer] = useState<HTMLElement | null>(null)
        , [isHovering, setIsHovering] = useState(false)
        , element = props.element

    useEffect(
        () => {
            function mouseOverHandler(target: HTMLElement) {
                return (event: MouseEvent) => setIsHovering(hoversOver(event, true, target))
            }

            function mouseOutHandler(target: HTMLElement, secondaryTarget: HTMLElement | null) {
                return (event: MouseEvent) => setIsHovering(hoversOver(event, false, target, secondaryTarget))
            }

            const subscriptions: (() => void)[] = []

            if (element) {
                subscriptions.push(dom.listen(element, 'mouseover', mouseOverHandler(element)))
                subscriptions.push(dom.listen(element, 'mouseout', mouseOutHandler(element, container)))
            }

            if (container) {
                subscriptions.push(dom.listen(container, 'mouseover', mouseOverHandler(container)))
                subscriptions.push(dom.listen(container, 'mouseout', mouseOutHandler(container, element)))
            }

            return () => {
                subscriptions.forEach(unsubscribe => unsubscribe())
            }
        },
        [element, container]
    )

    if (!isHovering)
        return null

    return (
        <Menu
            element={element}
            containerRef={setContainer}
        >
            {props.children}
        </Menu>
    )
}

export default HoverMenu

function hoversOver(event: MouseEvent, isOverEvent: true, hoverNode: Node | null): boolean
function hoversOver(event: MouseEvent, isOverEvent: false, hoverNode: Node | null, secondaryHoverNode: Node | null): boolean
function hoversOver(event: MouseEvent, isOverEvent: boolean, hoverNode: Node | null, secondaryHoverNode: Node | null = null): boolean {
    if (hoverNode === null)
        return false

    if (isOverEvent && contains(hoverNode, event.target))
        return true

    if (!isOverEvent) {
        return contains(hoverNode, event.relatedTarget) || !!secondaryHoverNode && contains(secondaryHoverNode, event.relatedTarget)
    }

    return false
}

function contains(node: Node, target: EventTarget | null) {
    return target instanceof Node ? node.contains(target) : false
}
