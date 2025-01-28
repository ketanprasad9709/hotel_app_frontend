import "./auth.css";

import { useLoginSignUp, useWishlist } from "./../../context";
import { signUpHandler, loginhandler, signUpTestHandler, getWishlistHandler } from "../../services";

export const AuthBox = () => {

    const { login, signUp, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, dispatchLogin_SignUp } = useLoginSignUp();

    const { dispatchWishlist } = useWishlist();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const handleLoginClick = () => {
        dispatchLogin_SignUp({
            type: "login"
        })
    };

    const handleSignUpClick = () => {
        dispatchLogin_SignUp({
            type: "signUp"
        })
    };

    const handleMobileNumberLogin = (event) => {
        if(event.target.value.length <= 10) {
            dispatchLogin_SignUp({
                type: "mobile-Number-login",
                payload: event.target.value
            })
        }
    };

    const handleMobileNumberSignUp = (event) => {
        if(event.target.value.length <= 10) {
            dispatchLogin_SignUp({
                type: "mobile-Number-signUp",
                payload: event.target.value
            })
        }
    };

    const handleName = (event) => {
        dispatchLogin_SignUp({
            type: "name",
            payload: event.target.value
        })
    };

    const handleEmail= (event)=> {
        dispatchLogin_SignUp({
            type: "email",
            payload: event.target.value
        })
    }

    const handlepassword = (event) => {
        dispatchLogin_SignUp({
            type: "password",
            payload: event.target.value
        })
    }

    const handleSignupPassword = (event) => {
        dispatchLogin_SignUp({
            type: "Signup-Password",
            payload: event.target.value
        })
    }

    const handleSignupConfirmPassword = (event) => {
        dispatchLogin_SignUp({
            type: "Signup-Confirm-Password",
            payload: event.target.value
        })
    }

    const handleloginSignUpModal = () => {
        dispatchLogin_SignUp({
            type: "login_signUp_modal"
        })
    }

    const handleCredentialsCheck = async() => {

        if(mobileNumberSignUp == ""){
            alert("Enter Mobile Number!");
        } else if(name == ""){
            alert("Enter your Name!");
        } else if((/^[A-Za-z]+(?=.* )?.+$/.test(name)) == false){
            alert("Enter a valid name!");
        } else if (email == ""){
            alert("Enter email ID!");
        } else if((/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)) == false){
            alert("Enter a valid email ID!");
        } else if(signup_password == ""){
            alert("Enter Password!");
        } else if(signup__confirm_password  == ""){
            alert("Re-enter Password!");
        } else if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*!&%]).{8,}$/.test(signup_password)) == false){
            alert("Password entered should contain atleast one lowercase letter, one uppercase letter, one digit, one special character from [ @ # $ * ! & % ] and should contain atleast 8 characters.");
        } else if(signup_password !== signup__confirm_password){
            alert("Passwords don't match!");
        } else{
                const response = await signUpTestHandler(mobileNumberSignUp, email);
                await delay(500); 

                if(response.data.exists == true){
                    dispatchLogin_SignUp({ type: "sign_up_test" });
                    return;
                } else if (response.data.exists == false) {
                    (() => {
                        signUpHandler(name, mobileNumberSignUp, email, signup_password);
                        dispatchLogin_SignUp({ type: "login_signUp_modal" });
                        dispatchLogin_SignUp({ type: "reset-signup-data" });
                        dispatchLogin_SignUp({
                                type: "signUp_data_post"
                        });
                        })()
                        return;
                    }
                
        }};


    const handleAccessToken = (accessToken) => {
        dispatchLogin_SignUp({ 
            type: "access-details-accessToken", 
            payload: accessToken 
        });
    }

    const handleUsername = (username) => {
        dispatchLogin_SignUp({ 
            type: "access-details-username", 
            payload: username 
        });
    }

    const handleNumber = (mobileNumber) => {
        dispatchLogin_SignUp({ 
            type: "access-details-number", 
            payload: mobileNumber 
        });
    }

    const handleEmailAddress = (email) => {
        dispatchLogin_SignUp({ 
            type: "access-details-email", 
            payload: email
        });
    }

    const handleIDdata = (iddata) => {
        dispatchLogin_SignUp({ 
            type: "access-details-_id", 
            payload: iddata 
        });
    }

    const handleWishlistData = (data) => {
        dispatchWishlist({
            type: "store-wishlist-data",
            payload: data
        });
    };

    const handleLoginVerify = async(event) => {

        event.preventDefault();

        if(mobileNumberLogin == ""){
            alert("Enter Mobile Number!");
            return;
        }

        if(password == ""){
            alert("Enter Password!");
            return;
        }

        const data = await loginhandler(mobileNumberLogin, password);

        if (data === false){
            alert("Enter correct user details.");
        }else{
            const { accessToken, username, number, email, _id } = data;

            handleloginSignUpModal();
            handleAccessToken(accessToken);
            handleUsername(username);
            handleNumber(number);
            handleEmailAddress(email);
            handleIDdata(_id);

            const hotelIDS = await getWishlistHandler(_id, accessToken);

            handleWishlistData(hotelIDS);

        }
    }; 
    
    const handleLoginTest = (event) => {
        
        event.preventDefault();

        const accessToken = "aabbccyy";
        const username = "Test";
        const number = 9000000000;
        const email = "xyz@abc.com";
        const _id = "1234567abc";

        handleloginSignUpModal();
        handleAccessToken(accessToken);
        handleUsername(username);
        handleNumber(number);
        handleEmailAddress(email);
        handleIDdata(_id);

    };

    return(
        <div className="d-flex login-signUp-outerBox">
            <div className="login-signup-parentBox">
                <div className="d-flex align-center topLine-dialogBox">
                    <button className={login ? "login_selected": "login"} onClick={handleLoginClick}>Login</button>
                    <button className={signUp ? "signUp_selected": "signUp"} onClick={handleSignUpClick}>Sign Up</button>
                    <span onClick={handleloginSignUpModal} className="material-symbols-outlined cancel-top">cancel</span>
                </div>
            {login && 
                <div>
                    <div className="in-gap mobile-password-container">
                        <p>Mobile Number <span className="required">*</span></p>
                        <input type="number" maxLength="10" placeholder="Enter Mobile Number" value={mobileNumberLogin} onChange={handleMobileNumberLogin} className="inputs"/>
                    </div>
                    <div className="in-gap mobile-password-container">
                        <p>Password <span className="required">*</span></p>
                        <input className="inputs" defaultValue={password} onChange={handlepassword} type="password" placeholder="Enter Password" />
                    </div>
                    <div className="d-flex verify-container">
                        <button className="in-gap-2 verify" onClick={handleLoginVerify}>Verify</button>
                    </div>
                    <div className="d-flex login-container">
                        <button className="in-gap-2 Login-Test-Credentials" onClick={handleLoginTest}>Login with Test Credentials</button>
                    </div>
                    <div className="d-flex or-container relative">
                        <hr className="strike"/>
                        <p className="d-flex align-center or absolute">or</p>
                    </div>
                    <div className="d-flex Login-with-Gmail-container">
                        <button className="in-gap-3 Login-with-Gmail">Login with Gmail</button>
                    </div>
                </div>}
            {signUp && 
                <div>
                    <div className="in-gap-5 signUp-containers">
                        <p>Mobile Number <span className="required">*</span></p>
                        <input className="inputs" type="number" maxLength="10" placeholder="Enter Mobile Number" value={mobileNumberSignUp} onChange={handleMobileNumberSignUp} />
                    </div>
                    <div className="in-gap-4 signUp-containers">
                        <p>Name <span className="required">*</span></p>
                        <input className="inputs" placeholder="Enter Name" type="text" defaultValue={name} onChange={handleName} />
                    </div>
                    <div className="in-gap-4 signUp-containers">
                        <p>Email <span className="required">*</span></p>
                        <input className="inputs" placeholder="Enter Email" type="email" defaultValue={email} onChange={handleEmail} />
                    </div>
                    <div className="in-gap-4 signUp-containers">
                        <p>Password <span className="required">*</span></p>
                        <input className="inputs" type="password" placeholder="Enter Password" defaultValue={signup_password} onChange={handleSignupPassword} />
                    </div>
                    <div className="in-gap-4 signUp-containers">
                        <p>Confirm Password <span className="required">*</span></p>
                        <input className="inputs" type="password" placeholder="Re-enter Password" defaultValue={signup__confirm_password} onChange={handleSignupConfirmPassword} />
                    </div>
                    <div className="d-flex submit-container">
                        <button className="in-gap-4 submit" onClick={handleCredentialsCheck}>Submit</button>
                    </div>
                </div>}
            </div>
            
        </div>
    )
};


    


        
                    
                    
                    
                    
                    