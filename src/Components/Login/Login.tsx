// @ts-ignore
import {actions} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import React from "react";

const Login: React.FC = () => {
    return <div>
        <a href={`https://social-network.samuraijs.com/`}> Войти через сайт</a>
    </div>
};
const login = actions.login;
export default connect(null, {login})(Login);
