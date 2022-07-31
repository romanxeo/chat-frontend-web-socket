import {io, Socket} from "socket.io-client";
import {messageType, userInfoType} from "../types/types";

export enum eventEnum {
    initMessagesPublished = 'init-messages-published',
    newMessageSent = 'new-message-sent',
    clientUserNameSent = 'client-user-name-sent',
    clientMessageSent = 'client-message-sent'
}

export const api = {
    socket: null as Socket | null,
    initSubscribe: false,

    createConnection() {
        if (!this.socket) {
            this.socket = io("localhost:5000")
        }
    },

    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null;
        this.initSubscribe = false;
    },

    subscribe(initMessagesHandler: (messagesList: messageType[]) => void,
              newMessageSentHandler: (newMessage: messageType) => void
    ) {
        if (!this.initSubscribe) {
            this.socket?.on(eventEnum.initMessagesPublished, initMessagesHandler)
            this.socket?.on(eventEnum.newMessageSent, newMessageSentHandler)
            this.initSubscribe = true
        }
    },

    sentName(userName: string, setUserInfoHandler: (userInfo: userInfoType) => void) {
        this.socket?.emit(eventEnum.clientUserNameSent, userName, (userInfo: userInfoType) => {
            setUserInfoHandler(userInfo)
        })
    },

    sentMessage(message: string) {
        this.socket?.emit(eventEnum.clientMessageSent, message, (error: string) => {if (error) alert(error)})
    }
}