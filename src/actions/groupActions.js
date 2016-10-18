import fetch from 'isomorphic-fetch'

export const REQUEST_GROUP_DETAILS = 'REQUEST_GROUP_DETAILS'
export const RECEIVE_GROUP_DETAILS = 'RECEIVE_GROUP_DETAILS'
export const SELECT_GROUP = 'SELECT_GROUP'
export const INVALIDATE_GROUP = 'INVALIDATE_GROUP'
export const REQUEST_GROUPS = 'REQUEST_GROUPS'
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'


function requestGroupDetails(groupName){
    return {
        type: REQUEST_GROUP_DETAILS,
        groupName
    }
}

function receiveGroupDetails(groupName,json){
    return {
        type: RECEIVE_GROUP_DETAILS,
        groupName,
        groupDetails: json,
        receivedAt: Date.now()
    }
}

export function selectGroup(groupName) {
    return {
        type: SELECT_GROUP,
        groupName
    }
}

export function invalidateGroup(groupName){
    return {
        type: INVALIDATE_GROUP,
        groupName
    }
}

function requestGroups(){
    return {
        type: REQUEST_GROUPS
    }
}

function receiveGroups(json){
    return {
        type: RECEIVE_GROUPS,
        grouplist: json,
        receivedAt: Date.now()
    }
}

function fetchGroups() {
    return dispatch => {
        dispatch(requestGroups())

        return fetch('https://localhost:44367/api/Group/')
            .then(response => response.json())
            .then(json => dispatch(receiveGroups(json)))
    }
}

function fetchGroupDetails(groupName){
    return dispatch => {
        dispatch(requestGroupDetails(groupName))
        return fetch('https://localhost:44367/api/Group/'+ groupName)
            .then(response => response.json())
            .then(json => dispatch(receiveGroupDetails(groupName, json)))
    }
}

function shouldFetchGroupDetails(state, groupName){
    const groupDetails = state.detailsByGroup[groupName]
    if(!groupDetails){
        return true
    } else if (groupDetails.isFetching) {
        return false
    } else {
        return groupDetails.didInvalidate
    }
}

export function fetchGroupDetailsIfNeeded(groupName){
    return (dispatch, getState) => {
        if(shouldFetchGroupDetails(getState(), groupName)) {
            return dispatch(fetchGroupDetails(groupName))
        }
    }
}

function shouldFetchGroups(state){
    const grouplist = state.grouplist
    if(!grouplist){
        return true
    } else if (grouplist.isFetching) {
        return false
    } else {
        return grouplist.didInvalidate
    }
}

export function fetchGroupsIfNeeded(){
    return (dispatch, getState) => {
        if(shouldFetchGroups(getState())){
            return dispatch(fetchGroups())
        }
    }
}

