import axios from "axios";
import {ProfileType, UserType} from "../types/types";

export const baseUrl = `https://social-network.samuraijs.com/api/1.0/`;

export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "f404dc77-ff8d-4e6e-8261-f4b258fd6313"}
});
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = "", friend: null | boolean = null) {
        return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then(response => {
            return response.data;
        });
    },
    follow(userId: number) {
        return instance.post(baseUrl + `follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(baseUrl + `follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object ');
        return profileAPI.getProfile(userId);
    }
};
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(baseUrl + `profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(baseUrl + `profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(baseUrl + `profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(baseUrl + `profile/photo`, formData, {headers: {'Content-Type': ' multipart/form-data'}})
    },
    saveProfile(profile: ProfileType) {
        return instance.put(baseUrl + `profile`, profile)
    }
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type MyResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        id: number
    },
    resultCode: ResultCodesEnum | ResultCodesForCaptcha,
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MyResponseType>(baseUrl + `auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(baseUrl + `auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<LoginResponseType>(baseUrl + `auth/login`)
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(baseUrl + `security/get-captcha-url`)
    }
};

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number,
    error: string | null
};
export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}
