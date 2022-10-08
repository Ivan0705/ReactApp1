import React from 'react';
// @ts-ignore
import classesDialogs from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {InitialStateType} from "../../redux/dialog-reducer";

type OwnPropsType = {
    dialogPage: InitialStateType,
    sendMessage: () => void,
    updateNewMessageBody: (messages: string) => void,
    isAuth: () => boolean
}
const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogPage;
    let dialogsElements = state.dialogs.map(dialog => < DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>);
    let messagesElements = state.messages.map(message => <Message key={message.id} name={message.name}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessage = () => {
        props.sendMessage();
    };

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    };
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={classesDialogs.dialogs}>
            <div className={classesDialogs.dialogsItems}>
                {
                    dialogsElements
                }
            </div>
            <div className={classesDialogs.messages}>
                {messagesElements}
            </div>
            <AddMessagesFormik onSendMessage={onSendMessage} onNewMessageChange={onNewMessageChange}
                               newMessageBody={newMessageBody}/>

        </div>);
};

const AddMessagesFormik = (props) => {
    return (<Formik
        initialValues={{
            newMessageBody: ""
        }}
        onSubmit={props.onSendMessage}>
        <Form>
            <label htmlFor="newMessageBody"/>
            <Field component={"textarea"} id="newMessageBody" name="newMessageBody"
                   className={classesDialogs.chat}
                   onChange={props.onNewMessageChange}
                   value={props.newMessageBody}
                   placeholder="Enter your message"/>
            <div>
                <button type={'submit'} className={classesDialogs.button}>Send</button>
            </div>
        </Form>
    </Formik>)

};
export default Dialogs;
