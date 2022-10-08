// @ts-ignore
import classesMyPost from '../MyPost.module.css'
import React, {useState} from "react";
import Preloader from "../../../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
// @ts-ignore
import userPhoto from "../../../../pictures/cat.webp";
import ProfileDataForm from "./ProfileDataForm";
import {PhotosType, ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    isOwner: boolean,
    saveProfile: ProfileType,
    photos: PhotosType,

}
const ProfileInfo: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0]);
    };
    const onSubmit = (formData) => {
        alert(formData);
    };

    return (
        <div>
            <div className={classesMyPost.descriptionBlock}>
                <img className={classesMyPost.picture} src={props.profile.photos.large || userPhoto} alt={''}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                {editMode ? <ProfileDataForm onSubmit={onSubmit} profile={props.profile}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}

            </div>
        </div>);
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
    </div>
};
const Contact = (props) => {
    return <div className={classesMyPost.contact}><b>{props.contactTitle}</b>:{props.contactValue}</div>

};
export default ProfileInfo;
