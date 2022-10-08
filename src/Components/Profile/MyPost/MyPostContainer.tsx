import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import MyPost from "./MyPost";


let mapStateToProps = (state) => {
    return {
        messagesData: state.profilePage.messagesData,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps: (dispatch) => { addPost: () => void; updateNewPostText: (text) => void };
mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updatePostActionCreator(text);
            dispatch(action)
        },
        addPost: () => {
            // @ts-ignore
            dispatch(addPostActionCreator());
        }
    };
};
const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;
