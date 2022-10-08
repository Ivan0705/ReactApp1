import {AxiosResponse} from "axios";
import {baseUrl, instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(baseUrl + `security/get-captcha-url`)
    }
};
instance.get<string>(baseUrl + 'auth/me').then((response: AxiosResponse<string>) => response.data.toUpperCase())