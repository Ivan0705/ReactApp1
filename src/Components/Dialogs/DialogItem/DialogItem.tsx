import React from 'react';
// @ts-ignore
import classesDialogs from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number,
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/dialogsPage/" + props.id;

    return (
        <div className={classesDialogs.item + ' ' + classesDialogs.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;