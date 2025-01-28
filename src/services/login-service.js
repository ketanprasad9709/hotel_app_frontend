import axios from "axios";

export const loginhandler = async(mobileNumberLogin, password) => {

    try{
        const {data: {accessToken: accessToken, username, number, email, _id}} = await axios.post("https://hotels-app-k5v8.onrender.com/api/auth/login",
            {
                number: mobileNumberLogin,
                password: password
            }
        );
        return { accessToken, username, number, email, _id };
    }catch(err){
        return false; 
    }

};