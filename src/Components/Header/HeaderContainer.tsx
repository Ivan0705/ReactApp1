import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";

type MapStateToProps = {
    isAuth: boolean,
    login: string,
    getAuthUserData: any
}


type MapDispatchToProps = {
    getAuthUserData: () => void,
    logout: () => void
}

class HeaderContainer extends React.Component<MapStateToProps, MapDispatchToProps> {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);