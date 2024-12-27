export const loginSignUpReducer = (state, {type, payload}) => {

    switch(type){
        case "login":
            return {
                ...state,
                login: true,
                signUp: false
            };
        case "signUp":
            return {
                ...state,
                signUp: true,
                login: false
            };
        case "login_signUp_modal":
            return{
                ...state,
                login_signUp_modalStatus: !state.login_signUp_modalStatus
            }
        case "mobile-Number-login":
            return {
                ...state,
                mobileNumberLogin: payload
            }
        case "mobile-Number-signUp":
            return {
                ...state,
                mobileNumberSignUp: payload
            }
        case "name":
            return  {
                ...state,
                name: payload
            }
        case "email":
            return {
                ...state,
                email: payload
            }
        case "password":
            return {
                ...state,
                password: payload
            }
        case "Signup-Password":
            return {
                ...state,
                signup_password: payload
            }
        case "Signup-Confirm-Password":
            return {
                ...state,
                signup__confirm_password: payload
            }
        case "access-details-accessToken":
            return {
                ...state,
                access_token: payload
            }
        case "access-details-username":
            return {
                ...state,
                user_name: payload
            }
        case "access-details-_id":
            return {
                ...state,
                user_ID: payload
            }
        case "reset-login-data":
            return {
                ...state,
                mobileNumberLogin: "" ,
                password: ""
            }
        case "reset-signup-data":
            return {
                ...state,
                mobileNumberSignUp: "",
                name: "",
                email: "",
                password: "",
                signup_password: "",
                signup__confirm_password: ""
            }
        case "reset-login-data-on-logout":
            return {
                ...state,
                access_token: "",
                user_name: "",
                user_ID: ""
            }
        default:
            return state;
    };
};