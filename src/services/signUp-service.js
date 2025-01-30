import axios from "axios";

export const signUpHandler = async(name, mobileNumberSignUp, email, signup_password) => {

    try{
        const data = await axios.post( "https://hotels-app-1088011548952.asia-south2.run.app/api/auth/register",
            {
                username: name,
                number: mobileNumberSignUp,
                email: email,
                password: signup_password
            }
        );
        
        return data;

    }catch(err){
        console.log("data not submitted.");
    }
};
