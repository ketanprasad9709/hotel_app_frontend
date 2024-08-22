import{ useNavigate } from "react-router-dom";

import "./hotelcard.css";

export const HotelCard = ({hotel_element}) => {

    const { _id, name, image, address, state, price, rating} = hotel_element;

    const navigate = useNavigate();

    const handleGetID = (id) => {
        navigate(`/hotels/${name}/${id}`);
    }

    return (
        <div onClick={() => handleGetID(hotel_element._id)} className="hotelcard-container shadow cursor-pointer relative">
            <img className="img" src={image} alt={name.length > 35 ? `${name.slice(0,35)}...` : name}/>
            <div className="hotel-card-details">
                <div className="first-row d-flex align-center">
                    <span className="location">{address}, {state}</span>
                    <span className="rating d-flex align-center">
                        <span className="material-symbols-outlined">star</span>
                        <span>{rating}</span>
                    </span>
                </div>
                <p className = "hotel-name">{name.length > 35 ? `${name.slice(0,35)}...` : name}</p>
                <div className="price-details d-flex align-center">
                    <span className="price">₹ {price}</span>
                    <span>/night</span>
                </div>
            </div>
            <button className="absolute button btn-wishlist">
                <span className="material-symbols-outlined favourite cursor">favorite</span>
            </button>
        </div>
    )
}
                