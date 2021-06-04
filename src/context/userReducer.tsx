

export const USER_ACTIONS = {
    ADD_USER: 'add_user',
    DELETE_USER: 'delete_user',

}

export const ACTIONS_REDUCER = {
    [USER_ACTIONS.ADD_USER]: (state:any , action:any) => ({
        ...state
    }),
    [USER_ACTIONS.DELETE_USER]: (state:any , action:any) => ({
        ...state
    })
}

export const reducer = ( state:any , action:any ) => {
    const actionReducer = ACTIONS_REDUCER[action.type];
    return actionReducer ? actionReducer(state, action) : state

}