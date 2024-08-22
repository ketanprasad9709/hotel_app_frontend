import { differenceInDays } from 'date-fns';

import { useState } from "react";

import "./price.css";
import { DateSelector } from "../DateSelector/dateEnabler";
import { useSearch } from "../../context"

export const Price = ({singleHotelElement}) => {

    const { price, rating } = singleHotelElement;

    const { no_of_guests, checkInDate, checkOutDate, dispatchSearch } = useSearch();

    const [guestTextVisibility, setGuestTextVisibility] = useState(true);

    const service_fee= 150;

    let daysDifference;

    if(checkInDate && checkOutDate) {
        daysDifference = differenceInDays(checkOutDate, checkInDate);
    }

    //console.log(`${daysDifference} is the no of daysInWeek.`);

    

    const handleGuestNumberSinglePage = (event) => {
        dispatchSearch({
            type: "No_of_guests",
            payload: event.target.value
        });
    };

    const handleFocus = () => {
        setGuestTextVisibility(false)
    };

    const handleBlur = () => {
        setGuestTextVisibility(true)
    };

    const handleInvalid = (event) => {
        event.preventDefault();
        alert("Please enter a valid value.");
    };

    const handleIncreaseGuests = () => {
        dispatchSearch({
            type: "Increament Guest no"
        });
    };

    const handleDecreaseGuests = () => {
        dispatchSearch({
            type: "Decreament Guest no"
        });
    };

    const maxValue = 10;

    console.log(`${no_of_guests} is the new guest value`);

    return (
        <div className="price-container shadow">
            <div className="d-flex align-center price-star">
                <p><span className="price-in-container">₹{price}</span> per night</p>
                <p className="d-flex align-center star-font-text">
                    <span className="material-symbols-outlined">star</span>
                    <span>{rating}</span>
                </p>
            </div>
            <div className="d-flex gap-dates check-in-out-parent-container">
                <div className="check-in-container-single-hotel">
                    <p className="check-in-out">Check In</p>
                    <DateSelector typeOf="checkIn"/>
                </div>
                <div className="check-in-container-single-hotel">
                    <p className="check-in-out">Check out</p>
                    <DateSelector typeOf="checkOut"/>
                </div>
            </div>
            <div className="guests gap-guests-single-page">
                <p>GUESTS</p>
                <div className="d-flex align-center gap-icon-number-single-page">
                    <span class="material-symbols-outlined plus-minus-single-page" onClick={handleDecreaseGuests}>remove</span>
                    <input className="guests-number" defaultValue={no_of_guests} value={no_of_guests} max={maxValue} readOnly onInvalid={handleInvalid} onFocus={handleFocus} onBlur={handleBlur} type="number" onChange={handleGuestNumberSinglePage} />
                    <span class="material-symbols-outlined plus-minus-single-page" onClick={handleIncreaseGuests}>add</span>
                </div>
                {/*{guestTextVisibility && <span>guests</span>}*/}
            </div>
            <button className="reserve">Reserve</button>
            <div className="price-calculation-container">
                <div className="price-calculation">
                    <p>₹{price} X {daysDifference} nights</p>
                    <p>₹{price*daysDifference}</p>
                </div>
                <div className="service-fee">
                    <p>Service fee</p>
                    <p>₹{service_fee}</p>
                </div>
            </div>
            <div className="total">
                <p>Total</p>
                <p>₹{price*daysDifference + service_fee}</p>
            </div>
        </div>
    )
}