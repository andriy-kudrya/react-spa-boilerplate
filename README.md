# React sample application
This is boilerplate code for sigle page applications based on React, Redux and TypeScript.
There I am resolving common problems that I often have to deal with in my experience.

# Warning
This project in its current state is still far from to be ready for production usage.

# Objectives
- Consistent action types wherever they are in use
- Utilities that simplify common redux use cases
- Reasonably compact production bundle size
- Liteweight common components, like date inputs, sort helers, etc.

## Consistent action types
Straightforward approach to write redux related code is as follows:
```ts
const FOO = 'foo'
    , BAR = 'bar'

function reducer(state: State = defaultState, action: Action): State {
    if (action.type === FOO) {
        const payload: number = action.payload
            , nextFoo = state.foo + payload

        return Object.assign({}, state, { foo: nextFoo })
    }

    if (action.type === BAR) {
        const payload: string = action.payload
            , nextBar = state.bar + payload

        return Object.assign({}, state, { bar: nextBar })
    }

    return state
}
```
And there is a deep problem. Although TypeScript is in use it doesn't helps much in terms of type safety.
Any time developer deals with action the burden of asserting proper action shape/type lies on his own shoulders.
Taking into account that same action may be used in several places (reducers/middlewares/views)
makes TypeScript hardly usable with such approach.

I've resolved this problem by attaching payload type to the action's TYPE (that is usually supposed to be a simple string).
Basically it allows to come up with miscellanos utilities that infer proper types by itself:
```ts
const FOO: ActionType<number> = 'foo'
    , BAR: ActionType<string> = 'bar'

function reducer(state: State = defaultState, action: Action): State {
    if (hasActionType(action, FOO)) {
        const payload = action.payload // action is infered to have field 'payload: number'
            , nextFoo = state.foo + payload

        return Object.assign({}, state, { foo: nextFoo })
    }

    if (hasActionType(action, BAR)) {
        const payload = action.payload // action is infered to have field 'payload: string'
            , nextBar = state.bar + payload

        return Object.assign({}, state, { bar: nextBar })
    }

    return state
}
```
So in any line of code that deals with actions it is now possible to have consistent infered action types
that are defined in one place.

## Redux utilites
There are currently just few of them: for reducer and simple side effects.

Reducer sample:
```ts
...
// every handler is properly type checked without any type specified
export default reducer(
    defaultState,
    handler(CARD_LIST_LOADED, (state, games) => shallowUpdate(state, { games })),
    handler(SORT_CARD_LIST, (state, sortState) => shallowUpdate(state, { games: sortGames(state.games, sortState) })),
    handler(CARD_LIST_PAGE_CHANGE, (state, pagination) => shallowUpdate(state, { pagination })),
)
...
```

Simple side effects (pretty common case) are handled with simple wrapper around middleware:
```ts
...
const factory = (authService: AuthService): EffectsFactory => dispatch => [
    handler(LOG_IN, credentials =>
        authService.logIn(credentials).then(data => {
            dispatch(loggedIn(data))
            dispatch(actions.navigateTo('cards'))
        })
    ),
    handler(LOG_OUT, () => {
        authService.clearSession()
        dispatch(loggedOut())
    }),
]
...
```
Anything more complex is supposed to use middleware directly. Turns out it is a rare case
compared to simple side effects mentioned above (e.g. error handling, synchronization with sessionStorage)

## Production bundle size
In addition to application logic itself third party libraries greatly cotribute to app bundle in terms of size.
Actually libraries may easily outweight application logic and end up in megabytes of data transfered over the wire. 
There various reasons for this:
- Many libraries use es6+ with babel 6 transpilation where classes (maybe other features) generate non treeshakable code (resolved in babel 7)
- In the same time they transpile every source file on its own so babel helpers are duplicated for every source file
- To cope with helper duplication there is babel-plugin-transform-runtime but by default it uses babel-runtime where helpers are prebuilt with own minimal version of core-js in babel 6 (babel 7 has version without core-js)
- By own version of core-js I mean it is not usable outside helpers itself and have size around 20kb, even if core-js is included in your project
- So for small libraries it is better to have duplicated helpers (under condition that code must be transpiled from es6+ to es5)
- Often library code is not treeshakable on its own
- Often library has way more funtionality than your project probably might need

What is done there to reduce bundle size:
- Do not use useful libraries that have extreme sizes (e.g. redux-form/minified/120 kB, it is more than react with react-dom, currently used final-form from the same author :) )
- Do not use useful libraries if extra functionality is not required (e.g. core-js ~60kB substituted with promise-polyfill ~7kB, that said core-js is extremely optimised it terms of size)
- Do not use useful libraries if it is not hard to implement required functionality on my own (e.g. react-router5 ~10kB was removed in favor of own Link component ~1kB)
- Have own set of commonly used components that are tricky to implement (component libraries tend to have megabytes of code). They are intended to have minimal markup or not at all if possible to let easy customization for particular project needs (currently there are sort helpers, date/number inputs but without IE11 fallback yet)
- Deduplicate babel helpers with own compiled babel helpers version that doesn't uses core-js. In one of projects it allowed me to reduce app size from 159 kB to 97 kB (not counting third party libraries, those are not under my control anyway)
