import { CATEGORY_VALUE, TYPE_VALUE } from "./actionTypes"

export const categoryValue = category => {
    return{
        type: CATEGORY_VALUE,
        payload: category
    }
}

export const typeValue = mode => {
    return{
        type: TYPE_VALUE,
        payload: mode
    }
}