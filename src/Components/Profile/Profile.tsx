import React from "react";
import ProfileInfo from "./MyPost/ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPost/MyPostContainer";
import {PhotosType} from "../../types/types";

type PropsType = {
    savePhoto: () => void,
    isOwner: boolean,
    profile: any,
    status: string
    updateStatus: (text: string) => void,
    saveProfile: any,
    photos: PhotosType,
    onPostChange: () => void
}
const Profile: React.FC<PropsType> = (props) => {

    return <div>
        <ProfileInfo savePhoto={props.savePhoto}
                     isOwner={!!props.isOwner}
                     profile={props.profile}
                     status={props.status ? props.status : "No status"}
                     updateStatus={props.updateStatus}
                     saveProfile={props.saveProfile} photos={props.photos}/>

        <MyPostContainer onPostChange={function (): void {
            throw new Error("Function not implemented.");
        }}/>
    </div>;
};
export default Profile;
