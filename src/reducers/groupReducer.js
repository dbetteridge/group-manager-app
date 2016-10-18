import { SELECT_GROUP, INVALIDATE_GROUP, REQUEST_GROUP_DETAILS, RECEIVE_GROUP_DETAILS, REQUEST_GROUPS, RECEIVE_GROUPS } from '../actions/groupActions'
import { combineReducers } from 'redux'

function selectedGroup(state = 'Perth Stadium', action) {
    switch(action.type) {
        case SELECT_GROUP:
            return action.groupName
        default:
            return state
    }
}

function groupDetails(state = {
    isFetching: false,
    didInvalidate: false,
    details: []
}, action) {
    switch (action.type) {
        case INVALIDATE_GROUP:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_GROUP_DETAILS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_GROUP_DETAILS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                details: action.groupDetails,
                lastUpdate: action.receivedAt

            })
        default:
            return state
    }
}

function groupLists(state = {
    isFetching: false,
    didInvalidate: false,
    grouplist: []
}, action) {
    switch (action.type) {
        case REQUEST_GROUPS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_GROUPS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                grouplist: action.grouplist,
                lastUpdate: action.receivedAt

            })
        default:
            return state
    }
}

function allGroups(state = {}, action){
    switch(action.type) {
        case REQUEST_GROUPS:
        case RECEIVE_GROUPS:
            return Object.assign({}, state, 
                groupLists(state, action)
            )
        default:
            return state
    }
}

function detailsByGroup(state = {}, action) {
    switch(action.type) {
        case INVALIDATE_GROUP:
        case REQUEST_GROUP_DETAILS:
        case RECEIVE_GROUP_DETAILS:
            return Object.assign({}, state, {
                [action.groupName]: groupDetails(state[action.groupName], action)
            })
        default:
            return state
        
    }
}

const rootReducer = combineReducers({
    selectedGroup,
    detailsByGroup,
    allGroups
})

export default rootReducer;