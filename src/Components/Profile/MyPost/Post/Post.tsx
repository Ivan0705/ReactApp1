// @ts-ignore
import classesPost from "./Post.module.css";
import React from "react";

const Post = (props) => {
    return (
        <div className={classesPost.post}>
            <div className={classesPost.item}>
                <img src='https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg' alt='cat'/>
                {props.message}
                <br/>
                <div>
                    <span>Like: {props.likeCount}</span>
                </div>
                <br/>
            </div>
        </div>
    )
};
export default Post;
