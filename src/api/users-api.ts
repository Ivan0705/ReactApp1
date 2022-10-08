import {profileAPI} from "./profile-api";
import {baseUrl, GetItemsType, instance} from "./api";
import {AxiosPromise} from "axios";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = "", friend: null | boolean = null) {
        return instance.get<GetItemsType>(baseUrl + `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then(response => {
            return response.data;
        });
    },
    follow(userId: number) {
        return instance.post<ResponseType>(baseUrl + `follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(baseUrl + `follow/${userId}`).then(response => response.data) as AxiosPromise<ResponseType>
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object ');
        return profileAPI.getProfile(userId);
    }
};