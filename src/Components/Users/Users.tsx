import React, {FC, useEffect} from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";


import {useNavigate} from "react-router-dom";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/user-selector";


type PropsType = {}
export const Users: FC<(PropsType)> = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);
    useEffect(() => {
        history({
            pathname: "/users"
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        let currentPage = 1;
        // @ts-ignore
        dispatch(requestUsers(currentPage, pageSize, filter))
    };
    const followingInProgress = useSelector(getFollowingInProgress);
    const followFunc = (userId: number) => {
        // @ts-ignore
        dispatch(follow(userId));
    };
    const unfollowFunc = (userId: number) => {
        // @ts-ignore
        dispatch(unfollow(userId));
    };
    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   portionCount={undefined}
        />
        {
            users.map(el => <User
                key={el.id}
                user={el}
                followingInProgress={followingInProgress}
                unfollow={unfollowFunc}
                follow={followFunc}/>
            )
        }
    </div>
};


export default Users;
