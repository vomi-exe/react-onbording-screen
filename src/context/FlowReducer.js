const AuthReducer = (state, action) => {

    switch (action.type) {
        case "FLOW_START":
            return {
                ...state,
                tempUserId: action.payload.tempUserId,
                s3url: action.payload.s3url,
                answers: [...state.answers, action.payload.answers]
            };
        case "FLOW_DOMAIN":
            return {
                answers: [...state.answers, action.payload.answer]
            };
        case "FLOW_OTTP":
            return {
                user: null,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        default:
            return { ...state };
    }
}

export default AuthReducer;