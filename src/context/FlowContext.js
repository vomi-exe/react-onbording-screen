import FlowReducer from "./FlowReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    newUser: true,
    deviceId: "",
    appFlavour: "DEV",
    versionNumber: "",
    s3url: "",
    tempUserId: null,
    answers: [],
};

export const FlowContext = createContext(INITIAL_STATE);

export const FlowContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(FlowReducer, INITIAL_STATE);

    return (
        <FlowContext.Provider
            value={{
                newUser: state.newUser,
                deviceId: state.deviceId,
                appFlavour: state.appFlavour,
                versionNumber: state.versionNumber,
                s3url: state.s3url,
                tempUserId: state.tempUserId,
                answers: state.answers,
                dispatch
            }}
        >
            {children}
        </FlowContext.Provider>
    );
};