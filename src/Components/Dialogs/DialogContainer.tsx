import Dialogs from "./Dialogs";
import {actions} from "../../redux/dialog-reducer";
import React from "react";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(actions.updateNewMessageBodyCreator(body));
        },
        sendMessage: (newMessageBody: string) => {
            dispatch(actions.sendMessageCreator(newMessageBody));
        }
    }
};
// @ts-ignore
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);