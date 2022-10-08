import React from "react";
// @ts-ignore
import classesHeader from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Avatar, Button} from 'antd';
import {AntDesignOutlined} from '@ant-design/icons';

const Header = (props) => {
    return (

        <header className={classesHeader.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/ZDF_logo%21_Logo_2021.svg/640px-ZDF_logo%21_Logo_2021.svg.png"
                alt="logo"/>
            <div className={classesHeader.loginBlock}>
                {props.isAuth ? <div>{props.login}
                    <Button style={{
                        textAlign: 'center',
                        margin: '15px'
                    }} onClick={props.logout}>Log out</Button>
                </div> : <NavLink to={`/login`}>
                    Login
                </NavLink>}
            </div>

        </header>

    );
};
export default Header;