import React, {useEffect, useRef, useState} from 'react';
import s from '../../App.module.css'
import {messageType, userInfoType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {destroyConnectionTC, setClientMessageTC} from "../../store/chatReducer";

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const userInfo = useSelector<AppRootStateType, userInfoType>(store => store.chat.userInfo)
    const messagesList =  useSelector<AppRootStateType, messageType[]>(store => store.chat.messagesList)

    const [messageText, setMessageText] = useState<string>('')
    //const [isAutoscroll, setIsAutoscroll] = useState<boolean>(true)

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const messages = messagesList.map((item: messageType) => {
        return (
            <div className={`${s.message} ${userInfo.userId === item.userId && s.myMessage}`} key={item.messageId}>
                <div>{item.userName}:</div>
                <div>{item.messageText}</div>
                <div>{item.created_at}</div>
            </div>
        )
    })

    // useEffect(() => {
    //     //dispatch(createConnectionTC() as any)
    //     //console.log("HUUUUUI")
    //     return () => {
    //         console.log('destroy connect')
    //       //  dispatch(destroyConnectionTC() as any)
    //     }
    // }, [])

    const sendMessage = () => {
        if (messageText.length > 0) {
            dispatch(setClientMessageTC(messageText) as any)
            setMessageText('')
        }
    }

    // const scrollChatEvent = (e: any) => {
    //     //console.log(e.currentTarget.scrollHeight)
    // }

    useEffect(() => {
        //isAutoscroll && messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messagesList])

    return (
        <div className={s.pageBlock}>
            <div
                className={s.chatBlock}
                //onScroll={(e) => scrollChatEvent(e)}
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