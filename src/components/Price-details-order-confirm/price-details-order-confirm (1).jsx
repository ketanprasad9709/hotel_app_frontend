import "./price-details-order-confirm.css"

export const Price_details_order_confirm= () => {

    const service_fee= 150;

    return (
        <div className="parent_summary_box-2">
            <div>

            </div>
            <p className="protection-text">Your stay is covered by <span className="company_name">Book My Hotel!</span></p>
            <div className="price_summary_container">
                <p className="price_details_text">Price Details</p>
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
        </div>
    )
}