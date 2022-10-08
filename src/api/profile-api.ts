import {PhotosType, ProfileType} from "../types/types";
import {baseUrl, instance, ResponseType} from "./api";


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(baseUrl + `profile/` + userId).then(response=>response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(baseUrl + `profile/status/` + userId).then(response=>response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(baseUrl + `profile/status`, {status: status}).then(response => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<PhotosType>>(baseUrl + `profile/photo`, formData, {headers: {'Content-Type': ' multipart/form-data'}}).then(response=>response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(baseUrl + `profile`, profile).then(response=>response.data).then(response=>response.data)
    }
};