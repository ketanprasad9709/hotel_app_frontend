import axios from "axios";

export const loginhandler = async(mobileNumberLogin, password) => {

    try{
        const {data: {accessToken: accessToken, username, _id}} = await axios.post("https://hotels-app-k5v8.onrender.com/api/auth/login",
            {
                number: mobileNumberLogin,
                password: password
            }
        );
        /*console.log("Data is found.");
        console.log({accessToken, username, ...rest});*/
        return { accessToken, username, _id };
    }catch(err){
        console.log("Data not found.");
        return false; 
    }

};