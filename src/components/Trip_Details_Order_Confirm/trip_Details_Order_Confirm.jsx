import { useNavigate } from "react-router-dom";

import "./trip_Details_Order_Confirm.css"

import { useSearch, useLoginSignUp } from "../../context"

export const Trip_Details_Order_Confirm = () => {

    const navigate = useNavigate();

    const { checkInDate, checkOutDate, no_of_guests, finalPrice } = useSearch();
    const { user_name, email_address, mobile_number } = useLoginSignUp();

    const razorpay_image_url = "https://i.imgur.com/a2936az.png";

    const loadScript = (source) => {
      return new Promise (resolve => {  
        const script = document.createElement("script");
        script.src = source;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    })}



    const handleConfirmBookingClick = async() => {
        try{
            const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        }catch(err){
            console.log("Unable to load script");
        }
    

        const options = {
            key: "rzp_test_Wt9ZxBlODsqmU1",
            amount: finalPrice*100,
            currency: "INR",
            name: "Book My Hotel!",
            email: email_address,
            contact: mobile_number,
            description: "Congratulations! Your booking is confirmed.",

            handler: ({payment_id}) => {
                navigate("/ordersummary");
            },

            prefill: {
                name: user_name,
                email: email_address,
                contact: mobile_number
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    };

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
                
                <button onClick={handleConfirmBookingClick} className="confirm_booking">Confirm Booking</button>
            </div>
        </div>
    )
}