import {authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

let initialState = {
    userId: 14924 as number | null,//1034
    email: null as number | null,
    login: null as number | null,
    isAuth: false,
    captchaUrl: null as number | null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                userId: "111",
                ...state,
                ...action.payload,
                isAuth: true
            };

        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    }),
    getAuthUserData: () => async (dispatch) => {
        let meData = await authAPI.me();

        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = meData.data;
            dispatch(actions.setAuthUserData(id, login, email, true));
        }
        return "Hello World!";
    },

    login: (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
        let LoginData = await authAPI.login(email, password, rememberMe, captcha);
        if (LoginData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.getAuthUserData())
        } else {
            if (LoginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(actions.getCaptchaUrl())
            }
        }
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL,
        payload: {captchaUrl}
    }),
    getCaptchaUrl: () => async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

    },
    logout:
        () => async (dispatch: any) => {
            let response = await authAPI.logout();

            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }

        },
};
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const getAuthUserData = () => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
    return "Hello World!";
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let LoginData = await authAPI.login(email, password, rememberMe, captcha);
    if (LoginData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.getAuthUserData())
    } else {
        if (LoginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            dispatch(actions.getCaptchaUrl())
        }
    }
};
export const getCaptchaUrlSuccess =
    (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL,
        payload: {captchaUrl}
    });
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

};
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }

};
export type InitialStateType = typeof initialState;

export default authReducer;