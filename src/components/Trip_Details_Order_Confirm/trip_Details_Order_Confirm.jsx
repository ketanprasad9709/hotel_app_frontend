import "./trip_Details_Order_Confirm.css"

import { useSearch } from "../../context"

export const Trip_Details_Order_Confirm = () => {

    const { checkInDate, checkOutDate, no_of_guests } = useSearch();

    const razorpay_image_url = "https://i.imgur.com/a2936az.png";

    return(
        <div className="parent_summary_box_1">
            <div className="top-box">
                <p className="summary">Summary</p>
                <p className="your_booking">Your Booking</p>
                <div className="padding_dates_guests">
                    <p className="dates_guests">Dates</p>
                    <span className="dates_guests">{checkInDate && checkOutDate && `${checkInDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})} - ${checkOutDate.toLocaleDateString("en-US", {day: "numeric", month: "short"})}`}</span>
                </div>
                <div className="padding_dates_guests">
                    <p className="dates_guests">Guests</p>
                    <span className="dates_guests">{no_of_guests && (no_of_guests>1 ? `${no_of_guests} guests`: `${no_of_guests} guest`)}</span>
                </div>

            </div>
            <div className="bottom-box">
                <p className="options_text">Payment Partner</p>
                <button className="payment_link d-flex align-center"><img className="razor" src={razorpay_image_url} alt="RazorPay" /></button>
                
                <button className="confirm_booking">Confirm Booking</button>
            </div>
        </div>
    )
}