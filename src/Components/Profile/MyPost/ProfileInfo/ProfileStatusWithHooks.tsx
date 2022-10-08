import React, {useEffect, useState} from "react";

type PropsType = {
    status: string,
    updateStatus: (text: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editModel, setEditModel] = useState(false);
    let [status, setStatus] = useState(
        props.status
    );
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    const activateEditMode = () => {
        setEditModel(true);
    };
    const deactivateEditMode = () => {
        setEditModel(false);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };
    return (
        <div>
            {!editModel && <div>
                <b>Status:</b> <span onClick={activateEditMode}>{props.status}</span>
            </div>}
            {editModel &&
            < div>
                <input autoFocus={true}
                       onBlur={deactivateEditMode} onChange={onStatusChange}/>
            </div>}
        </div>
    );
};

export default ProfileStatusWithHooks;
