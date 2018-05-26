const bindComponentBlackList = new Set([
    'constructor',

    'componentDidMount',
    'shouldComponentUpdate',
    'componentWillUnmount',
    'componentDidCatch',

    'getSnapshotBeforeUpdate',
    'componentDidUpdate',

    'componentWillMount',
    'UNSAFE_componentWillMount',
    'componentWillReceiveProps',
    'UNSAFE_componentWillReceiveProps',
    'componentWillUpdate',
    'UNSAFE_componentWillUpdate',
])

/**
 * Binds methods in DIRECT prototype of component to instance
 * (components are expected to be composed rather then subclassed)
 * @param instance component instance
 */
function bindComponent<C extends React.Component<any, any, any>>(instance: C): void {
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)) as Array<keyof C>

    keys.forEach(key => {
        const shouldBind = !bindComponentBlackList.has(key) && typeof instance[key] === 'function'

        if (shouldBind)
            instance[key] = instance[key].bind(instance)
    })
}

export { bindComponent }
