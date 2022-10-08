import {createSelector} from 'reselect';
import {AppStateType} from "./redux-store";


export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};
export const getUsersSelector2 = (state: AppStateType) => {
    // @ts-ignore
    return getUsersSelector(state).users.filter(el => true);
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(el => true);
});

export const getTempSavedUsers = (state: AppStateType) => {
    return state.usersPage.users.filter(el => true);
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};

export const countSomethingDifficult = (state: AppStateType) => {
    let count = 23;
    return count;
};
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};