import axios from "axios";

export const signUpTestHandler = async(mobileNumberSignUp, email) => {

    try{
        const response = await axios.post( "https://hotels-app-1088011548952.asia-south2.run.app/api/auth/signuptest",
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
