import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

import "./order_confirmation.css";


import { Trip_Details_Order_Confirm, Price_details_order_confirm, Navbar } from "../../components";
import { useSearch, useLoginSignUp } from "../../context";

export const OrderConfirmation = ()  => {

    /*const { id } = useParams();*/

    const { single_hotel_data, no_of_guests, checkInDate, checkOutDate } = useSearch();
    const { access_token } = useLoginSignUp();
    /*const [singleHotelConfirm, setSingleHotelConfirm] = useState([]);*/

    /*useEffect(() => {
        (async() => {
            try{
                const { data } = await axios.get(`https://hotels-app-k5v8.onrender.com/api/hotels/${id}`)
                setSingleHotelConfirm(data);
            }catch(err){
                console.log("Hotel confirm data not found.")
            }
        
    })()}, [])*/

    if(!(access_token) || !(no_of_guests) || !(checkInDate) || !(checkOutDate)){
        return (
            <p className="not_allowed">You are not authorized to access this page.</p>
        )
    }

    return(
        <div className="order_confirmation_outer_box">
            <Navbar />
            <div className="d-flex align-center">
                <Trip_Details_Order_Confirm />
                <Price_details_order_confirm singleHotelData={single_hotel_data} />
            </div>
        </div>
    )
}