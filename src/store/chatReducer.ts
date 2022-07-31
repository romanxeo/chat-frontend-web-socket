import {messageType, userInfoType} from "../types/types";
import {api} from "../api/api";

const setUserInfoAC = (userInfo: userInfoType) => {
    return {
        type: 'chat/setUserInfo',
        userInfo
    } as const
}

const receivedMessagesListAC = (messagesList: messageType[]) => {
    return {
        type: 'chat/receivedMessagesList',
        messagesList
    } as const
}

const receivedNewMessageAC = (newMessage: messageType) => {
    return {
        type: 'chat/receivedNewMessage',
        newMessage
    } as const
}

export type setUserInfoAT = ReturnType<typeof setUserInfoAC>
export type receivedMessagesListAT = ReturnType<typeof receivedMessagesListAC>
export type receivedNewMessageAT = ReturnType<typeof receivedNewMessageAC>

export type actionType = setUserInfoAT
    | receivedMessagesListAT
    | receivedNewMessageAT

type InitStateType = {
    userInfo: userInfoType,
    messagesList: messageType[]
}
export const initState: InitStateType = {
    userInfo: {userName: '', userId: ''},
    messagesList: [],
}

export const chatReducer = (state: InitStateType = initState, action: actionType): InitStateType => {
    switch (action.type) {
        case 'chat/setUserInfo': {
            return {...state, userInfo: action.userInfo}
        }
        case 'chat/receivedMessagesList': {
            return {...state, messagesList: action.messagesList}
        }
        case 'chat/receivedNewMessage': {
            return {...state, messagesList: [...state.messagesList, action.newMessage]}
        }
        default: {
            return state
        }
    }
}

export const createConnectionTC = () => (dispatch: any) => {
    api.createConnection()
    api.subscribe(
        (messagesList: messageType[]) => {
            dispatch(receivedMessagesListAC(messagesList))
        },
        (newMessage: messageType) => {
            dispatch(receivedNewMessageAC(newMessage))
        }
    )
}

export const destroyConnectionTC = () => (dispatch: any) => {
    api.destroyConnection()
}

export const setClientNameTC = (userName: string) => (dispatch: any) => {
    api.sentName(userName, (userInfo: userInfoType) => {
        dispatch(setUserInfoAC(userInfo))
    })
}

export const setClientMessageTC = (message: string) => (dispatch: any) => {
    api.sentMessage(message)
}