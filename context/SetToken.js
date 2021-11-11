import React, {useState, createContext } from "react";

export const SetToken = createContext();

const SetTokenProvider = (props) => {
    const [token, setToken] = useState();
    const [username, setUsername] = useState();
    const [edit, setEdit] = useState(false);

    const addToken = (token) => {
        setToken(token);
    };
    const addUsername = (username) => {
        setUsername(username);
    };
    const editProfile = (edit) => {
        setEdit(edit);
    }

    return(
        <SetToken.Provider value={{
            token, username, addToken, addUsername, editProfile, edit
        }}>
            {props.children}
        </SetToken.Provider>
    )
};

export default SetTokenProvider;
//export const SetUsername = createContext({});