import React from 'react';
import s from './App.module.css';
import SelectUser from "./components/selectUser/SelectUser";
import Chat from "./components/chat/Chat";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "./store/store";

function _App() {
    const userName = useSelector<AppRootStateType, string>(store => store.chat.userInfo.userName)
    return (
        <div className={s.App}>
            {userName.length === 0
                ? <SelectUser/>
                : <Chat/>
            }
        </div>
    )
}

function App () {
    return (
        <Provider store={store}>
            <_App />
        </Provider>
    )
}

export default App;
