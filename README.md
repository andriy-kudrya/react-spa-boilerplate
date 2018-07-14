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
Anything more complex is supposed to use middleware directly.

## Production bundle size
To be continued...
