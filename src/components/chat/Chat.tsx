import React, {useEffect, useRef, useState} from 'react';
import s from '../../App.module.css'
import {messageType, userInfoType} from "../../types/types";
import {socket} from "../../App";

type propsType = {
    userInfo: userInfoType
}

const Chat: React.FC<propsType> = props => {

    const {
        userInfo
    } = props

    const [messagesList, setMessagesList] = useState<messageType[]>([])

    const [messageText, setMessageText] = useState<string>('')
    const [isAutoscroll, setIsAutoscroll] = useState<boolean>(true)

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const messages = messagesList.map((item) => {
        return (
            <div className={s.message} key={item.messageId}>
                <div>{item.userName}:</div>
                <div>{item.messageText}</div>
                <div>{item.created_at}</div>
            </div>
        )
    })

    useEffect(() => {
        socket.on('init-messages-published', (messagesList: messageType[]) => {
            console.log(messagesList)
            setMessagesList(messagesList)
        })
    }, [])

    useEffect(() => {
        socket.on('new-message-sent', (newMessage: messageType) => {
            setMessagesList([...messagesList, newMessage])
        })
    })

    const sendMessage = () => {
        if (messageText.length > 0) {
            socket.emit("client-message-sent", messageText)
            setMessageText('')
        }
    }

    const scrollChatEvent = (e: any) => {
        //console.log(e.currentTarget.scrollHeight)
    }

    useEffect(() => {
        isAutoscroll && messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messagesList])

    return (
        <div className={s.pageBlock}>
            <div
                className={s.chatBlock}
                onScroll={(e) => scrollChatEvent(e)}
            >
                {messages}
                <span ref={messagesAnchorRef}></span>
            </div>

            <div className={s.chatInputBlock}>
                <span>{userInfo.userName}: </span>
                <textarea value={messageText} onChange={(e) => setMessageText(e.currentTarget.value)}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat