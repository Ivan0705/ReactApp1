import {UserType} from "../../types/types";

type UpdateObjectInArrayType = {items: Array<UserType>, itemId: string, objPropName: string, newObj: boolean }

export const updateObjectInArray = (items, itemId, objPropName, newObj) => {
    return items.map(el => {
        if (el[objPropName] === itemId) {
            return {...el, ...newObj}
        }
        return el;
    });
};