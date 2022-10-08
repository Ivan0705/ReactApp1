import React from "react";
import Post from "./Post/Post";
// @ts-ignore
import classesMyPost from './MyPost.module.css'

type PropsType = {
    messagesData: any,
    addPost: () => void,
    updateNewPostText: (text: string) => void,
    newPostText: string,
    onPostChange: () => void
}

const MyPost: React.FC<PropsType> = React.memo(props => {

    let messagesElements = (props.messagesData).map(message => <Post key={message.id} message={message.message}
                                                                     likeCount={message.likeCount}/>);
    let newPostElement = React.createRef();
    let onAddPost = () => {
        props.addPost();
    };
    let onPostChange = () => {
        // @ts-ignore
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (<div className={classesMyPost.postBlock}>
            <h3>My posts</h3>
            <AddPost onAddPost={onAddPost} onPostChange={onPostChange} newPostElement={newPostElement}
                     newPostText={props.newPostText}/>
            <div className={classesMyPost.posts}>
                {messagesElements}
            </div>
        </div>
    );
    ;
})

const AddPost = (props) => {
    return (
        <div>
            <textarea onChange={props.onPostChange} ref={props.newPostElement} value={props.newPostText}/>
            <div>
                <button onClick={props.onAddPost}>Add post</button>
            </div>
        </div>


    )
};
export default MyPost;


