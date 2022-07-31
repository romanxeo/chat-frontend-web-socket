import React, {useEffect, useState} from 'react';
import s from '../../App.module.css'
import {useDispatch} from "react-redux";
import {createConnectionTC, setClientNameTC} from "../../store/chatReducer";

const SelectUser: React.FC = () => {

    const dispatch = useDispatch()

    const [userNameText, setUserNameText] = useState<string>('')

    const sendName = () => {
        if (userNameText.length > 0) {
            dispatch(setClientNameTC(userNameText) as any)
            setUserNameText('')
        }
    }

    useEffect(() => {
        dispatch(createConnectionTC() as any)
    }, [])

    return (
        <div className={`${s.pageBlock} ${s.pageSelectName}`}>
            <span>Enter name:</span>
            <input value={userNameText} onChange={(e) => setUserNameText(e.currentTarget.value)}/>
            <button onClick={sendName}>Join to chat</button>
        </div>
    )
}

export default SelectUser