import React, {useState} from 'react';
import s from '../../App.module.css'
import {socket} from "../../App";
import {userInfoType} from "../../types/types";

type propsType = {
    setUserInfo: (obj: userInfoType) => void
}

const SelectUser: React.FC<propsType> = props => {

    const {
        setUserInfo
    } = props

    const [userNameText, setUserNameText] = useState<string>('')

    const sendMessage = () => {
        if (userNameText.length > 0) {
            socket.emit("client-user-name-sent", userNameText)

            setUserInfo({userName: userNameText, userId: userNameText})
            setUserNameText('')
        }
    }

    return (
        <div className={`${s.pageBlock} ${s.pageSelectName}`}>
            <span>Enter name:</span>
            <input value={userNameText} onChange={(e) => setUserNameText(e.currentTarget.value)}/>
            <button onClick={sendMessage}>Join to chat</button>
        </div>
    )
}

export default SelectUser