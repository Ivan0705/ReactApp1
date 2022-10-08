import React from 'react';
// @ts-ignore
import classesDialogs from '../Dialogs.module.css'


const Message = (props) => {
    return (<div className={classesDialogs.message}>{props.name}</div>);
};

export default Message;
