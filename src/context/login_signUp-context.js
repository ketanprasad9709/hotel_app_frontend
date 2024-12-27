import { createContext, useContext, useReducer } from "react";

import { loginSignUpReducer } from "./../reducers";

const initialState = {
    login: true,
    signUp: false,
    login_signUp_modalStatus: false,
    mobileNumberLogin: "",
    mobileNumberSignUp: "",
    name: "",
    email: "",
    password: "",
    signup_password: "",
    signup__confirm_password: "",
    access_token: "",
    user_name: "",
    user_ID: ""
};

const login_signUp = createContext(initialState);

const LoginSignUpProvider = ({children}) => {

    const [ { login, signUp, login_signUp_modalStatus, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, access_token, user_name, user_ID }, dispatchLogin_SignUp ]= useReducer(loginSignUpReducer, initialState );

        return (
            <login_signUp.Provider value={{ login, signUp, login_signUp_modalStatus, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, access_token, user_name, user_ID, dispatchLogin_SignUp }}>
                {children}
            </login_signUp.Provider>
        )
}

const useLoginSignUp = () => useContext(login_signUp);

export { useLoginSignUp, LoginSignUpProvider };