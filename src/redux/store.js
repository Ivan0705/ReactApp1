import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";
import {siderbarReducer} from "./siderbar-reducer";


let store = {
    _state: {
        dialogPage: {
            messages: [
                {id: 1, name: "Hello"},
                {id: 2, name: "Hi"},
                {id: 3, name: "How are you?"},
                {id: 4, name: "I'm OK!"}
            ],
            dialogs: [
                {id: 1, name: "Cat"},
                {id: 2, name: "Dog"},
                {id: 3, name: "Rat"},
                {id: 4, name: "Mouse"}
            ],
            newMessageBody: '',
        },
        profilePage: {
            messagesData: [
                {id: 1, message: "Hello!", likeCount: 12},
                {id: 2, message: "Hi", likeCount: 2},
                {id: 3, message: "How are you?", likeCount: 8}

            ],
            newPostText: 'JohnCherry'
        },
        sidebar: {},
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("State changed!")
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.sidebar = siderbarReducer(this._state.sidebar, action);
        this._callSubscriber(this.state);
    }
};
export default store;
window.store = store;