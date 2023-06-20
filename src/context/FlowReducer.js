// reducer for state containing state changing logic

const FlowReducer = (state, action) => {

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
                ...state,
                answers: [...state.answers, action.payload.answer]
            };
        case "FLOW_OTTP":
            return {
                ...state,
                answers: [...state.answers, action.payload.answer]
            };
        default:
            return { ...state };
    }
}

export default FlowReducer;