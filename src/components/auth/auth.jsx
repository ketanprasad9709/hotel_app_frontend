import "./auth.css";

import { useLoginSignUp, useWishlist } from "./../../context";
import { signUpHandler, loginhandler } from "../../services";
import { getWishlistHandler } from "../../services";

export const AuthBox = () => {

    const { login, signUp, mobileNumberLogin, mobileNumberSignUp, name, email, password, signup_password, signup__confirm_password, access_token, user_name, user_ID, dispatchLogin_SignUp } = useLoginSignUp();

    const { wishlistData, dispatchWishlist } = useWishlist();

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
                payload: Number(event.target.value)
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

    const handleSubmitSignUp = () => {

        (mobileNumberSignUp == "") ? alert("Enter Mobile Number!") : ((name == "") ? alert("Enter your Name!") : (((/^[A-Za-z]+(?=.* ).+$/.test(name)) == false) ? alert("Enter a valid name!") : ((email == "") ? alert("Enter email ID!") : (((/^[a-z]+@[a-z]+\.[a-z]{2,3}$/.test(email)) == false) ? alert("Enter a valid email ID!") : ((signup_password == "") ? alert("Enter Password!") : ((signup__confirm_password  == "") ? alert("Re-enter Password!") : (((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*!&%]).{8,}$/.test(signup_password)) == false) ? alert("Password entered should contain atleast one lowercase letter, one uppercase letter, one digit, one special character from [ @ # $ * ! & % ] and should contain atleast 8 characters.") : ((signup_password !== signup__confirm_password) ? alert("Passwords don't match!") 
        : ((() => {
            signUpHandler(name, mobileNumberSignUp, email, signup_password);
            dispatchLogin_SignUp({ type: "login_signUp_modal" });
            dispatchLogin_SignUp({ type: "reset-signup-data" });
          })()
        )))))))))

    };

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
            const { accessToken, username, _id } = data;
            console.log(`${accessToken} is access token`);
            console.log(`${username} is user name`);
            console.log(`${_id} is userID.`);

            handleloginSignUpModal();
            handleAccessToken(accessToken);
            handleUsername(username);
            handleIDdata(_id);

            const hotelIDS = await getWishlistHandler(_id, accessToken);
            console.log(hotelIDS);

            handleWishlistData(hotelIDS);

        }
    }; 
    
    /*const handleGetWishlistData = async() => {

        await getWishlistHandler(user_ID, access_token);
        console.log(`${access_token} is stored token.`);
        console.log(`${user_name} is stored user name.`);
            
    }
        
    const handleLoginEvent = async(event) => {

        await handleLoginVerify(event);
        await handleGetWishlistData();
    };*/
    
    /*const handlewishdata = (wishlistData) => {
        console.log(wishlistData);
    };*/

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
                        <button className="in-gap-2 Login-Test-Credentials" /*onClick={() => handlewishdata(wishlistData)}*/>Login with Test Credentials</button>
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
                        <button className="in-gap-4 submit" onClick={handleSubmitSignUp}>Submit</button>
                    </div>
                </div>}
            </div>
        </div>
    )
};
        
                    
                    
                    
                    
                    