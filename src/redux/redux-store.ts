import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {dialogReducer} from "./dialog-reducer";
import {siderbarReducer} from "./siderbar-reducer";
import {profileReducer} from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {initializeApp} from "./app-reducer";
import {ThunkAction} from "redux-thunk/es/types";
import chatReducer from "./chat-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: siderbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: initializeApp,
    chat: chatReducer

});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesType<T>>;


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
window.__store__ = store;

export default store;