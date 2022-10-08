import {addPostActionCreator, deletePost, profileReducer} from "./profile-reducer";
import React from "react";

let state = {
    messagesData: [
        {id: 1, message: "Hello!", likeCount: 12},
        {id: 2, message: "Hi", likeCount: 2},
        {id: 3, message: "How are you?", likeCount: 8}

    ],
};
let action = addPostActionCreator("Hi");
let action2 = deletePost(1);

it('length of messagesData should be incremented', () => {
    let newState = profileReducer(state, action);
    expect(newState.messagesData.length).toBe(4);
});

it('after deleting length of messages should be decrement', () => {
    let newState = profileReducer(state, action2);
    expect(newState.messagesData.length).toBe(3);
});