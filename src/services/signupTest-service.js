import axios from "axios";

export const signUpTestHandler = async(mobileNumberSignUp, email) => {

    try{
        const response = await axios.post( "https://hotels-app-k5v8.onrender.com/api/auth/signuptest",
            {
                number: mobileNumberSignUp,
                email: email
            }
        );
        
        return response;

    }catch(err){
        console.log("data for signup testing not submitted.");
    }
};