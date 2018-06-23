import * as React from 'react'

const bindComponentBlackList = {
    constructor: 0,

    componentDidMount: 0,
    shouldComponentUpdate: 0,
    componentWillUnmount: 0,
    componentDidCatch: 0,

    getSnapshotBeforeUpdate: 0,
    componentDidUpdate: 0,

    componentWillMount: 0,
    UNSAFE_componentWillMount: 0,
    componentWillReceiveProps: 0,
    UNSAFE_componentWillReceiveProps: 0,
    componentWillUpdate: 0,
    UNSAFE_componentWillUpdate: 0,
}

/**
 * Binds methods in DIRECT prototype of component to instance
 * (components are expected to be composed rather then subclassed)
 * @param instance component instance
 */
function bindComponent<C extends React.Component<any, any, any>>(instance: C): void {
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)) as Array<keyof C>

    keys.forEach(key => {
        const shouldBind = !(key in bindComponentBlackList) && typeof instance[key] === 'function'

        if (shouldBind)
            // todo: fails to compile with ts 2.9.1 without cast to any
            instance[key] = (instance[key] as any).bind(instance)
    })
}

export { bindComponent }
