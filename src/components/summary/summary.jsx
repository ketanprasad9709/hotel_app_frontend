import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import "./summary.css";

import { useSearch } from "../../context";

export const Summary= () => {

    const navigate = useNavigate();

    const { single_hotel_data, checkInDate, checkOutDate, no_of_guests, finalPrice, dispatchSearch } = useSearch();

    const { name, city, state } = single_hotel_data;

    const daysDifference = differenceInDays(checkOutDate, checkInDate);

    const handleContinueBooking = () => {

        dispatchSearch({
            type: "reset_search_bar_data"
        });
        navigate("/");
    }

    return(
        <>
            <div className="summary-container d-flex align-center">
                <div className="congrats-confirmed">
                    <span className="congrats">Congratulations! </span>
                    <span className="Booking_confirmed">Your Booking is Confirmed.</span>
                </div>
                <p className="Order_Details">Booking Details</p>
                <div className="Booked-Hotel-Details d-flex align-center">
                    <div className="detail-name gap-details-summary d-flex align-center">
                        <p>Hotel Name</p>
                        <p>Location</p>
                        <p>Stay Dates</p>
                        <p>No of Nights</p>
                        <p>No of Guests</p>
                        <p>Paid Amount</p>
                    </div>
                    <div className="colon gap-details-summary d-flex align-center">
                        <p>|</p>
                        <p>|</p>
                        <p>|</p>
                        <p>|</p>
                        <p>|</p>
                        <p>|</p>
                    </div>
                    <div className="value-name gap-details-summary d-flex align-center">
                        <p>{name}</p>
                        <p>{city}, {state}</p>
                        <p>{`${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})} - ${checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}`}</p>
                        <p>{daysDifference}</p>
                        <p>{no_of_guests}</p>
                        <p>₹ {finalPrice}</p>
                    </div>
                </div>
                <div className="Covered-text">
                    <span>Your stay is covered under </span>
                    <span className="Brand-name">Book My Hotel!</span>
                    <span> protection.</span>
                </div>
            </div>
            <div className="continue-booking">
                <button onClick={handleContinueBooking} className="continue-booking-button">Continue Booking</button>
            </div>
        </>
    )
}
