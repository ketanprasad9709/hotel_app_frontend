import { createContext, useContext, useReducer } from "react";

import { loginSignUpReducer } from "./../reducers";

const initialState = {
    login: true,
    signUp: false,
    signUp_postData_status: false,
    signup_test: false,
    logout: false,
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
    mobile_number: null,
    email_address: "",
    user_ID: "",
    hasShownLoginToast: false
};

const login_signUp = createContext(initialState);

const LoginSignUpProvider = ({children}) => {

    const [ { login, signUp, signUp_postData_status, signup_test, logout, login_signUp_modalStatus, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, access_token, user_name, mobile_number, email_address, user_ID, hasShownLoginToast }, dispatchLogin_SignUp ]= useReducer(loginSignUpReducer, initialState );

        return (
            <login_signUp.Provider value={{ login, signUp, signUp_postData_status, signup_test, logout, login_signUp_modalStatus, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, access_token, user_name, mobile_number, email_address, user_ID, hasShownLoginToast, dispatchLogin_SignUp }}>
                {children}
            </login_signUp.Provider>
        )
}

const useLoginSignUp = () => useContext(login_signUp);

export { useLoginSignUp, LoginSignUpProvider };
