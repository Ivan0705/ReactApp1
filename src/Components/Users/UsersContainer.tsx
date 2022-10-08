import React from "react";


import {useSelector} from "react-redux";
import Preloader from "../../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/user-selector";
import Users from "./Users";

type UsersPagePropsType = {
    pageTitle: string
};

export const UsersPage: React.FC<UsersPagePropsType> = () => {
    const isFetching = useSelector(getIsFetching);

    return <>
        {isFetching ?
            <Preloader/> : null}
        <Users/>
    </>
};



