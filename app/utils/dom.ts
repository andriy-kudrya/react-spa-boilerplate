function listen<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): () => void {
    element.addEventListener(type, listener, options)
    return () => element.removeEventListener(type, listener, options)
}

export {
    listen,
}
