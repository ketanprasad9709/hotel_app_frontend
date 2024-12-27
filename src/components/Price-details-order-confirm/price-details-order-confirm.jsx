import { differenceInDays } from 'date-fns';

import "./price-details-order-confirm.css"

import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSearch } from "../../context";

export const Price_details_order_confirm= ({singleHotelData}) => {

    

    const { checkInDate, checkOutDate } = useSearch();

    /*const { id } = useParams();*/

    const service_fee= 150;
    let daysDifference;
    
    if(checkInDate && checkOutDate) {
        daysDifference = differenceInDays(checkOutDate, checkInDate);
    } else {
        daysDifference = 0;
    }

    /*const [singleHotelConfirm, setSingleHotelConfirm] = useState([]);

    useEffect(() => {
        (async() => {
            try{
                const { data } = await axios.get(`https://hotels-app-k5v8.onrender.com/api/hotels/${id}`)
                setSingleHotelConfirm(data);
            }catch(err){
                console.log("Hotel confirm data not found.")
            }
        
    })()}, [])*/

    const { price, image, name, city, state, rating } = singleHotelData;

    return (
        <div className="parent_summary_box_2">
            <div className="d-flex top_container_summary_2">
                <img className="hotel_1st_image" src={image} alt="Hotel Image" />
                <div className="hotel_text_rating">
                    <div>
                        <p className="hotel_name_summary">{name}</p>
                        <p className="city_state_summary">{city}, {state}</p>
                    </div>
                    <div className="d-flex align-center">
                        <span className="material-symbols-outlined star_icon">star</span>
                        <p>{rating}</p>
                    </div>
                </div>
            </div>
            <p className="protection-text">Your stay is covered by <span className="company_name">Book My Hotel!</span></p>
            <div className="price_summary_container">
                <p className="price_details_text">Price Details</p>
                <div className="price-calculation-container-2">
                    <div className="price-calculation-2">
                        <p>₹{price} X {daysDifference} nights</p>
                        <p>₹{price*daysDifference}</p>
                    </div>
                    <div className="service-fee-2">
                        <p>Service fee</p>
                        <p>₹{service_fee}</p>
                    </div>
                </div>
                <div className="total-2">
                    <p>Total</p>
                    <p>₹{price*daysDifference + service_fee}</p>
                </div>
            </div>
        </div>
    )
}