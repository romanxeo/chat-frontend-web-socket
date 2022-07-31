import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {chatReducer} from "./chatReducer";

const rootReducer = combineReducers({
    chat: chatReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;