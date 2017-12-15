// @flow
import { combineReducers } from 'redux'

// @Reducer
function items(state = [], action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            return [{
                id: action.payload.id,
                text: action.payload.text
            }, ...state]
        }

        case 'DEL_ITEM': {
            return state.filter(item => item.id !== action.id)
        }

        default:
            return state
    }
}

function history(state = [], action) {
    switch (action.type) {
        case 'ADD_HISTORY': {
            return [{
                id: action.history.id,
                text: action.history.text,
                type: action.history.type
            }, ...state]
        }

        case 'REMOVE_HISTORY': {
            return state.filter(item => item.id !== action.id)
        }

        default:
            return state
    }
}

const itemApp = combineReducers({ items, history })

export default itemApp
