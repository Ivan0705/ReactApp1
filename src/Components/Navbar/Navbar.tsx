import React from "react";
// @ts-ignore
import {NavLink, useHistory} from "react-router-dom";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Menu,} from 'antd';

const Navbar = () => {
    const navbarItems = [{
        name: 'Profile',
        path: '/profile',
        key: 0
    }, {
        name: 'Message',
        path: '/dialogs',
        key: 1
    }, {
        name: 'Users',
        path: '/users',
        key: 2
    }, {
        name: 'Chat',
        path: '/chat',
        key: 3
    },];

    const items = [...navbarItems.map(el => ({
        key: el.key,
        path: el.path,
        label: <NavLink to={el.path}>{el.name}</NavLink>,
    }))];
    return (
        <Menu
            style={{
                width: 256,
            }}
            defaultOpenKeys={['sub1']}
            mode="vertical"
            theme="dark"
            items={items}
        />
    );
};

export default Navbar;