
import {MessagesDataType, PhotosType, ProfileType} from "../types/types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO = "SAVE_PHOTO";


let initialState = {
    messagesData: [
        {id: 1, message: "Hello!", likeCount: 12},
        {id: 2, message: "Hi", likeCount: 2},
        {id: 3, message: "How are you?", likeCount: 8}

    ] as Array<MessagesDataType>,
    newPostText: '' as string | null,
    profile: null as ProfileType | null,
    status: "" as string | null
};
export type InitialStateType=typeof initialState;
export const profileReducer = (state = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: state.newPostText,
                likeCount: 0
            };
            /*  let stateCopy = {...state};
            stateCopy.messagesData = [...state.messagesData];
            stateCopy.messagesData.push(newPost);
            stateCopy.newPostText = '';*/
            return {
                ...state,
                messagesData: [...state.messagesData, newPost],
                newPostText: ''
            };
        }

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                messagesData: [...state.messagesData],
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile

            };
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            };
        }
        case DELETE_POST:
            return {
                ...state, messagesData: state.messagesData.filter(el => el.id !== action.id)
            };
        case SAVE_PHOTO:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            };
        default:
            return state;
    }
};
type AddPostActionCreatorType = { type: typeof ADD_POST, values: string }
export const addPostActionCreator = (values: string): AddPostActionCreatorType => ({type: ADD_POST, values});

type UpdatePostActionCreatorType = { type: typeof UPDATE_NEW_POST_TEXT, newText: string }
export const updatePostActionCreator = (text: string): UpdatePostActionCreatorType => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
};

type SetUserProfileType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response));

};
export const setStatus = (status: string) => ({type: SET_STATUS, status});


export const getUsersStatus = (userId: number) => async (dispatch: any) => {
    let data= await profileAPI.getStatus(userId);
    dispatch(setStatus(data));

};

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {

    }
};

type DeletePostType = { type: typeof DELETE_POST, postId: number }
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

type SavePhotoSuccessType = { type: typeof SAVE_PHOTO, photo: PhotosType }
export const savePhotoSuccess = (photo: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO, photo});

export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        // @ts-ignore
        dispatch(savePhotoSuccess(data.data.data.photos));
    }
};