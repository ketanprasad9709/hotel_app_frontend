import { useLocation, useNavigate } from 'react-router-dom';

import "./navbar.css";

import { useSearch, useLoginSignUp, useWishlist } from "./../../context";


export const Navbar = () => {

    const { checkInDate, checkOutDate, destination, no_of_guests, searchModalStatus, dispatchSearch } = useSearch();
    const { user_name, access_token, dispatchLogin_SignUp } = useLoginSignUp();
    const { dispatchWishlist } = useWishlist();

    const location = useLocation();
    const navigate = useNavigate();

    const company_logo_url = "https://i.imgur.com/3C4s17z.png";

    const handleSearchClick = () => {
        dispatchSearch({
            type: "Open_Search_Modal"
        });
    };

    const handleLoginSignUpClick = () => {
        !access_token ? dispatchLogin_SignUp({
            type: "login_signUp_modal"
        }) : dispatchWishlist({
            type: "Wishlist-modal"
        })
    };

    const handleLogoClick = () => {
        navigate("/");
    }

    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1 text-border">
                <img className="company_logo" onClick={handleLogoClick} src={company_logo_url} alt="Book My hotel!"/>
            </h1>

            {!searchModalStatus && !location.pathname.includes("wishlist") && !location.pathname.includes("ordersummary") && !location.pathname.includes("/book/stay") &&
            (<div onClick={handleSearchClick} className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">{destination || "Select Location"}</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">{checkInDate && checkOutDate ? `${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})} - ${checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}` : "Select Date"}</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">{no_of_guests && (no_of_guests>1 ? `${no_of_guests} guests`: `${no_of_guests} guest`) || "Add Guest(s)"}</span>
                <span className="material-symbols-outlined search">search</span>
            </div>)}
            
            <nav className="d-flex align-center gap-large">
                {user_name && <span className="userName">Hi! {user_name.split(" ")[0].charAt(0).toUpperCase() + user_name.split(" ")[0].slice(1).toLowerCase()}</span>}
                {!location.pathname.includes("/book/stay") && !location.pathname.includes("/ordersummary") && <div onClick={handleLoginSignUpClick} className="nav d-flex align-center cursor-pointer">
                    <span className="material-symbols-outlined profile-option menu">menu</span>
                    <span className="material-symbols-outlined profile-option person">account_circle</span>
                </div>}
            </nav>

        </header>
    );
};