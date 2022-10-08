import {chatAPI, ChatMessageType} from "../api/chat-api";
import {AnyAction, Dispatch} from "redux";


const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';


let initialState = {
    messages: [] as ChatMessageType[]
};

const chatReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };

        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: MESSAGE_RECEIVED,
        payload: {messages}
    }),

};

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (newMessageHandler === null) {
        newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        };
        return newMessageHandler;
    }
};

export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
};

export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop();
};

export const sendMessagesListening = (message: string):any=> async (dispatch) => {
    chatAPI.send(message);
};
export type InitialStateType = typeof initialState;

export default chatReducer;