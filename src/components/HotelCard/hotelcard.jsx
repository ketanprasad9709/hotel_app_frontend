import{ useNavigate } from "react-router-dom";

import "./hotelcard.css";
import { wishlistHandler, deleteWishlistHandler } from "./../../services";
import { useLoginSignUp, useWishlist } from "../../context";

export const HotelCard = ({hotel_element}) => {

    const { _id, name, image, address, state, price, rating} = hotel_element;

    const { access_token, user_ID, dispatchLogin_SignUp } = useLoginSignUp();

    const { wishlistData, dispatchWishlist } = useWishlist();

    const navigate = useNavigate();

    const handleGetID = (id) => {
        navigate(`/hotels/${name}/${id}`);
    }

    const handleWishlistClick = (id, user_ID, access_token) => {
        !(wishlistData.includes(id)) ? wishlistHandler(id, user_ID, access_token) : deleteWishlistHandler(id, user_ID, access_token);
        !(access_token) ? dispatchLogin_SignUp({
            type: "login_signUp_modal" }) : (!(wishlistData.includes(id)) ? dispatchWishlist({
                        type: "store-wishlist-data",
                        payload: [id]
                    }) : dispatchWishlist({
                        type: "delete-wishlist-data",
                        payload: id
                    }));
        }

    console.log(wishlistData);

    return (
        <div className="hotelcard-container shadow cursor-pointer relative">
            <div onClick={() => handleGetID(hotel_element._id)} >
                <img className="img" src={image} alt={name.length > 35 ? `${name.slice(0,35)}...` : name}/>
                <div className="hotel-card-details">
                    <div className="first-row d-flex align-center">
                        <span className="location">{address}, {state}</span>
                        <span className="rating d-flex align-center">
                            <span className="material-symbols-outlined star-icon">star</span>
                            <span>{rating}</span>
                        </span>
                    </div>
                    <p className = "hotel-name">{name.length > 35 ? `${name.slice(0,35)}...` : name}</p>
                    <div className="price-details d-flex align-center">
                        <span className="price">₹ {price}</span>
                        <span>/night</span>
                    </div>
                </div>
            </div>
            <button className="absolute button btn-wishlist">
                <span onClick={() => handleWishlistClick(hotel_element._id, user_ID, access_token)} className={ wishlistData.includes(hotel_element._id) ? "material-symbols-outlined favourite-red cursor" : "material-symbols-outlined favourite cursor"}>favorite</span>
            </button>
        </div>
    )
}
                