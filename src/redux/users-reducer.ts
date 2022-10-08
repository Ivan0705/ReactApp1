import {updateObjectInArray} from "../utils/validators/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {AnyAction, Dispatch} from "redux";
import {usersAPI} from "../api/api";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'FOLLOWING_IN_PROGRESS';
const SET_FILTER = 'SET_FILTER';


let initialState = {// @ts-ignore
    users: [] as Array<UserType>,
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,// @ts-ignore
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case
        FOLLOW:
            return {
                ...state, users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case
        UNFOLLOW:
            return {
                ...state, users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case
        SET_USERS:
            return {...state, users: action.users};
        case
        SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case
        SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};
        case
        TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case
        TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress] :
                    [...state.followingInProgress.filter(id => id !== action.userId)]
            };
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;

    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
};

export type UnFollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
};

export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}

export type SetToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}


export type SetToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>;


export const requestUsers = (page: number, pageSize: number, filter: FilterType):AnyAction => {

    // @ts-ignore
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount));

    };
};

// @ts-ignore
const followUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnFollowSuccessType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));

};
export const follow = (userId: number): ThunkType => {
    // @ts-ignore
    return async (dispatch) => {
        // @ts-ignore
        let apiMethod = usersAPI.follow.bind(usersAPI);
        followUnfollow(dispatch, userId, apiMethod, actions.followSuccess)
    };
};

export const unfollow = (userId: number): ThunkType => {
    // @ts-ignore
    return async (dispatch) => {
        // @ts-ignore
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        followUnfollow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    };
};


export const actions = {// @ts-ignore
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users}),
    setCurrentPage: (currentPage: number): SetCurrentPageType => ({
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }),
    setFilter: (filter: FilterType) => ({
        type: SET_FILTER,
        payload: filter
    }),
    setUsersTotalCount: (count: number): SetUsersTotalCountType => ({
        type: SET_TOTAL_USERS_COUNT,
        count: count
    }),
    followSuccess: (userId: number): FollowSuccessType => ({type: FOLLOW, userId}),

    unfollowSuccess: (userId: number): UnFollowSuccessType => ({type: UNFOLLOW, userId}),
    toggleIsFetching: (isFetching: boolean): SetToggleIsFetchingType => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    }),
    toggleFollowingProgress: (isFetching: boolean, userId: number): SetToggleFollowingProgressType => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    })
};
export default usersReducer;
export type FilterType = typeof initialState.filter
