import { useNavigate, useLocation } from "react-router-dom"

import "./wishlistLogout.css"

import { useWishlist, useSearch, useLoginSignUp } from "../../context";

export const WishlistLogout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { dispatchWishlist } = useWishlist();
    const { dispatchLogin_SignUp } = useLoginSignUp();
    const { dispatchSearch } = useSearch();

    const handleWishClick = () => {
        dispatchWishlist({
            type: "Wishlist-modal"
        });
        navigate("/wishlist");
    }

    const handleLogOut = () => {
        dispatchLogin_SignUp({
            type:"reset-login-data-on-logout"
        });
        dispatchLogin_SignUp({
            type:"reset-login-data"
        });
        dispatchWishlist({
            type: "reset-wishlist-data"
        });
        dispatchWishlist({
            type: "Wishlist-modal"
        });
        navigate("/");
    } 

    const handleWishlistCloseClick = () => {
        dispatchWishlist({
            type: "Wishlist-modal"
        })
    }

    return(
        <div className="d-flex logout-outerbox">
            <div className="logout-innerbox relative">
                {!location.pathname.includes("wishlist") &&
                <div onClick={handleWishClick} className="d-flex align-center gap-def wishlist-area">
                    <span class="material-symbols-outlined favorite">favorite</span>
                    <p className="WishList">Wishlist</p>
                </div>}
                <div onClick={handleLogOut} className="d-flex align-center gap-def logout-area">
                    <span class="material-symbols-outlined logout">logout</span>
                    <p className="LogOut">Logout</p>
                </div>
                <span onClick={handleWishlistCloseClick} className="material-symbols-outlined close-wishlist-box absolute">cancel</span>
            </div>
        </div>
    )
}
                    
                    