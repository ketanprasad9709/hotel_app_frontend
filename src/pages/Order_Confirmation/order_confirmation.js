import "./order_confirmation.css";

import { Trip_Details_Order_Confirm, Price_details_order_confirm, Navbar } from "../../components";
import { useSearch, useLoginSignUp } from "../../context";

export const OrderConfirmation = ()  => {

    const { single_hotel_data, no_of_guests, checkInDate, checkOutDate } = useSearch();
    const { access_token } = useLoginSignUp();

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

