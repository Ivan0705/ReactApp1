import React from "react";
import {ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType,
    onSubmit: React.FormEventHandler;
}

const ProfileDataForm: React.FC<PropsType> = ({profile}) => {
    return <form onSubmit={event => console.log(event)}>
        <div>
        </div>
        <div>
            FullName:{createField("fullName", "fullName")}
        </div>
        <div>
            My job:{profile.lookingForAJob ? "Yes" : "No"}
            {createField("Job", "lookingMyAJob", {type: "checkbox"})}
        </div>

        <div>
            My skills:{profile.lookingForAJobDescription ? "Yes" : "No"}
            {createField("Textarea", "lookingMyAJob")}
        </div>

        <div>
            About me:{profile.aboutMe}
            {createField("about me", "me")}
        </div>
    </form>
};
const createField = (placeholder, name, props = {}, text = "") => (
    <div>
        <input placeholder={placeholder} name={name} type={"text"} {...props}/>{text}
    </div>
);
export default ProfileDataForm;
