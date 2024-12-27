import axios from "axios";

export const signUpHandler = async(name, mobileNumberSignUp, email, signup_password) => {

    try{
        const data = await axios.post( "https://hotels-app-k5v8.onrender.com/api/auth/register",
            {
                username: name,
                number: mobileNumberSignUp,
                email: email,
                password: signup_password
            }
        );
        console.log(`${data} is submitted`);
        console.log(data);

    }catch(err){
        console.log("data not submitted.");
    }
};