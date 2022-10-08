const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

type MessagesType = { id: number, name: string }
type DialogsType = { id: number, name: string }
let initialState = {
    messages: [
        {id: 1, name: "Hello"},
        {id: 2, name: "Hi"},
        {id: 3, name: "How are you?"},
        {id: 4, name: "I'm OK!"}
    ] as Array<MessagesType>,
    dialogs: [
        {id: 1, name: "Cat"},
        {id: 2, name: "Dog"},
        {id: 3, name: "Rat"},
        {id: 4, name: "Mouse"}
    ] as Array<DialogsType>,

    newMessageBody: '' as string | null
};

export type InitialStateType = typeof initialState;


export const dialogReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.body
            };
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: ' ',
                messages: [...state.messages, {id: 5, name: body}]
            };
        }

        default:
            return state;
    }
};


type SendMessageCreatorType = { type: typeof SEND_MESSAGE, newMessageBody: string }
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({
    type: SEND_MESSAGE,
    newMessageBody
});
type UpdateNewMessageBodyCreatorType = { type: typeof UPDATE_NEW_MESSAGE_BODY, body: string }
export const updateNewMessageBodyCreator = (text: string): UpdateNewMessageBodyCreatorType => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: text}
};
export const actions = {
    sendMessageCreator: (newMessageBody: string): SendMessageCreatorType => ({
        type: SEND_MESSAGE,
        newMessageBody
    }),
    updateNewMessageBodyCreator: (text: string) => {
        return {type: UPDATE_NEW_MESSAGE_BODY, body: text}
    }
};