import React, {useState, createContext } from "react";

export const SetToken = createContext();

const SetTokenProvider = (props) => {
    const [token, setToken] = useState();
    const [username, setUsername] = useState();

    const addToken = (token) => {
        setToken(token);
    };
    const addUsername = (username) => {
        setUsername(username);
    };

    return(
        <SetToken.Provider value={{
            token, username, addToken, addUsername
        }}>
            {props.children}
        </SetToken.Provider>
    )
};

export default SetTokenProvider;
//export const SetUsername = createContext({});