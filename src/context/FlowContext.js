import FlowReducer from "./FlowReducer";
import { createContext, useReducer } from "react";

// initial state of the app

const INITIAL_STATE = {
    newUser: true,
    deviceId: "387c2863-6ee3-4a56-8210-225f774edade",
    appFlavour: "DEV",
    versionNumber: "2.5.0",
    s3url: "",
    tempUserId: null,
    answers: [],
};

export const FlowContext = createContext(INITIAL_STATE);

export const FlowContextProvider = ({ children }) => {

    // reducer method to dispatch actions and state changes
    const [state, dispatch] = useReducer(FlowReducer, INITIAL_STATE);

    // context is passed to the whole app and can be requested from any children component
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