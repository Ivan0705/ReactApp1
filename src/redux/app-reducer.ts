import {actions} from "./auth-reducer";
import {Promise} from "q";
import {InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
    initialized: boolean
}
type ActionsType = InferActionsTypes<typeof actions_app_reducer>

let InitialStateType: initialStateType = {
        initialized: false
    }
;
const appReducer = (state: initialStateType = InitialStateType, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const actions_app_reducer = {initializedSuccess: (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})};

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});
export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(actions.getAuthUserData());
        // @ts-ignore
        Promise.all([promise]).then(() => {
            dispatch(actions_app_reducer.initializedSuccess());
        })
    };
};

export default appReducer;