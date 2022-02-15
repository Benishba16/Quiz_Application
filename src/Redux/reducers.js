const initialState = {
    category: "",
    mode: "",
} 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "CATEGORY_VALUE":
            return{
                ...state,
                category: action.payload
            }
        case "TYPE_VALUE":
            return{
                ...state,
                mode: action.payload
            }
        default:
            return state
    }
}

export default reducer