import React, {useState, createContext } from "react";

export const SetToken = createContext();

const SetTokenProvider = (props) => {
    const [token, setToken] = useState();
    const [username, setUsername] = useState();
    const [edit, setEdit] = useState(false);
    const [login, setLogin] = useState(false);

    const addToken = (token) => {
        setToken(token);
    };
    const addUsername = (username) => {
        setUsername(username);
    };
    const editProfile = (edit) => {
        setEdit(edit);
    };
    const loginHandler = (login) => {
        setLogin(login);
    };

    return(
        <SetToken.Provider value={{
            token, username,login, addToken, addUsername, editProfile, edit, loginHandler
        }}>
            {props.children}
        </SetToken.Provider>
    )
};

export default SetTokenProvider;
//export const SetUsername = createContext({});