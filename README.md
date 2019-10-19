# React sample application
This is boilerplate code for single page applications based on React, Redux and TypeScript.
There I am resolving common problems that I often have to deal with.

# Warning
This project in its current state is still far from to be ready for production usage.

# Objectives
- Consistent action types wherever they are in use
- Utilities that simplify common redux use cases
- Reasonably compact production bundle size
- Lightweight common components, like date inputs, sort helpers, etc.

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
Any time developer deals with action the burden of asserting proper action shape/type lies on him.
Taking into account that same action may be used in several places (reducers/middlewares/views) this
makes TypeScript hardly usable with such approach.

Invented solution to this problem is to attach payload type to the action's *type* (that is usually supposed to be a simple string).
Basically this allows to come up with miscellaneous utilities that infer proper types by themselves:
```ts
const FOO: ActionType<number> = 'foo'
    , BAR: ActionType<string> = 'bar'

function reducer(state: State = defaultState, action: Action): State {
    if (hasActionType(action, FOO)) {
        const payload = action.payload // action is inferred to have field 'payload: number'
            , nextFoo = state.foo + payload

        return Object.assign({}, state, { foo: nextFoo })
    }

    if (hasActionType(action, BAR)) {
        const payload = action.payload // action is inferred to have field 'payload: string'
            , nextBar = state.bar + payload

        return Object.assign({}, state, { bar: nextBar })
    }

    return state
}
```
So in any line of code that deals with actions it is now possible to have consistent inferred action types
that are defined in single place.

That said, I've recently found interesting discussion with alternative approaches in the redux repo
https://github.com/reduxjs/redux/issues/992

## Redux utilities
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
Anything more complex is supposed to use middleware directly (e.g. error handling, synchronization with sessionStorage).

# Error handling
There is error middleware that handles synchronous and asynchronous errors. In case of asynchronous it expects that other middlewares in chain,
including effects, return promise that rejects in case of errors. In a more complex case other middleware might need to handle errors by itself.

# Learning curve
JavaScript basics:
- http://learn.javascript.ru/
- JavaScript: The Good Parts. Douglas Crockford

JavaScript frequently used API:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

JavaScript deeper dive:
- https://github.com/getify/You-Dont-Know-JS

TypeScript:
- https://www.typescriptlang.org/docs/home.html (handbook and what's new sections in the first place)

React:
- https://reactjs.org/docs/getting-started.html
- https://css-tricks.com/learning-react-container-components/
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

Redux basics:
- https://egghead.io/redux (both courses)
- https://redux.js.org/

Redux deeper dive:
- https://leanpub.com/redux-book
