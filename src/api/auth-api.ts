import {baseUrl, instance, ResponseType, ResultCodesEnum, ResultCodesForCaptcha} from "./api";


type LoginResponseDataType = {
    id: number
}

type MyResponseDataType = {
    id: number,
    email: string,
    login: string,
    resultCode: 1
}
export const authAPI = {
    me() {
        return instance.get<ResponseType<MyResponseDataType>>(baseUrl + `auth/me`).then(response => response.data.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCaptcha>>(baseUrl + `auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete(baseUrl + `auth/login`)
    }
};