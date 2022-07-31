import React, {useState} from 'react';
import s from './App.module.css';
import {io} from "socket.io-client";
import {userInfoType} from "./types/types";
import SelectUser from "./components/selectUser/SelectUser";
import Chat from "./components/chat/Chat";

export let socket = io("localhost:5000")

function App() {

    const [userInfo, setUserInfo] = useState<userInfoType>({userName: '', userId: ''})

    return (
        <div className={s.App}>
            {userInfo.userName.length === 0
                ? <SelectUser setUserInfo={setUserInfo}/>
                : <Chat userInfo={userInfo}/>
            }
        </div>
    )
}

export default App;
