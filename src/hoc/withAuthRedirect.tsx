import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForDirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export function withAuthRedirect<WXP>(Component: React.ComponentType<WXP>) {
    function RedirectComponent(props) {
        if (props.isAuth === false) {
            return <Navigate to={'/login'}/>;
        }
        return <Component {...props}/>
    }

    return connect(mapStateToPropsForDirect)(RedirectComponent);
}
