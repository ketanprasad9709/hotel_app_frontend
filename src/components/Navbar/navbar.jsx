import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

import "./navbar.css";
import { useSearch, useLoginSignUp, useWishlist } from "./../../context";


export const Navbar = () => {

    const { checkInDate, checkOutDate, destination, no_of_guests, wishlistStatus, dispatchSearch, searchModalStatus } = useSearch();
    const { user_name, access_token, dispatchLogin_SignUp } = useLoginSignUp();
    const { dispatchWishlist } = useWishlist();

    const location = useLocation();

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

    //console.log(`${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})} is the date`);

    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1 text-border">
                <a className="link" href="/">Book My Hotel!</a>
            </h1>

            {/*{ (checkInDate && checkOutDate && destination && no_of_guests) ? 
            (<div onClick={handleSearchClick} className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">{destination}</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">{`${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}`} &ndash; {`${checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}`}</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">{no_of_guests} {no_of_guests>1?<span>guests</span>:<span>guest</span>}</span>
                <span className="material-symbols-outlined search">search</span>
            </div>) : (!searchModalStatus && 
            (<div onClick={handleSearchClick} className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">Select Location</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Select Date</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Add Guest(s)</span>
                <span className="material-symbols-outlined search">search</span>
            </div>))}*/}

            {!searchModalStatus && !location.pathname.includes("wishlist") &&
            (<div onClick={handleSearchClick} className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">{destination || "Select Location"}</span>
                <span className ="border-right-1px"></span>
                {/*<span className="form-option">{checkInDate && checkOutDate ? `${checkInDate.toLocaleDateString("en-US", {day: "numeric",
              month: "short",})} - ${checkOutDate.toLocaleDateString("en-US", {day: "numeric",month: "short",})}`: "Any Week"}</span>*/}
                <span className="form-option">{checkInDate && checkOutDate ? `${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})} - ${checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}` : "Select Date"}</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">{no_of_guests && (no_of_guests>1 ? `${no_of_guests} guests`: `${no_of_guests} guest`) || "Add Guest(s)"}</span>
                <span className="material-symbols-outlined search">search</span>
            </div>)}
            

            {/*{ !searchModalStatus && 
            <div onClick={handleSearchClick} className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">Select Location</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Select Date</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Add Guest(s)</span>
                <span className="material-symbols-outlined search">search</span>
            </div>}*/}
            <nav className="d-flex align-center gap-large">
                {user_name && <span className="userName">Hi! {user_name.split(" ")[0]}</span>}
                <div onClick={handleLoginSignUpClick} className="nav d-flex align-center cursor-pointer">
                    <span className="material-symbols-outlined profile-option menu">menu</span>
                    <span className="material-symbols-outlined profile-option person">account_circle</span>
                </div>
            </nav>

        </header>
    );
};