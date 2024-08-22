import "./HotelDetails.css";
import { Fragment } from "react";

export const HotelDetails = ({singleHotelElement}) => {
    const { hostName, numberOfguest, numberOfBedrooms, numberOfBeds, numberOfBathrooms } = singleHotelElement
    return (
        <Fragment>
            <div className="details-1 gap-details">
                <p className="head-text">Hosted by {hostName}</p>
                <p className="body-text">{numberOfguest} {numberOfguest>1 ? "guests": "guest"}. {numberOfBedrooms} {numberOfBedrooms>1 ? "bedrooms": "bedroom"}. {numberOfBeds} {numberOfBeds>1 ? "beds": "bed"}. {numberOfBathrooms} {numberOfBathrooms>1 ? "bathrooms": "bathroom"}</p>
            </div>
            <div className="details-2 gap-details">
                <div className="d-flex align-center gap-icon-text">
                    <span className="material-symbols-outlined">work</span>
                    <span className="head-text">Dedicated Workspace</span>
                </div>
                <p className="body-text gap-text">A common area with wifi that is well suited for working</p>
                <div className="d-flex align-center gap-icon-text">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="head-text">Great Location</span>
                </div>
                <p className="body-text gap-text">80% of recent guests gave the location a 5-star rating</p>
                <div className="d-flex align-center gap-icon-text">
                    <span className="material-symbols-outlined">radio_button_partial</span>
                    <span className="head-text">Free cancellation before 7 days of booking</span>
                </div>
            </div>
            <div className="gap-details">
                <p className="head-text gap-text">What this place offers</p>
                <div className="d-flex body-text column-gap">
                    <div className="gap-details-2">
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">Kitchen</span>
                        </div>
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">Free parking on premises</span>
                        </div>
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">Dedicated Workspace</span>
                        </div>
                    </div>
                    <div className="gap-details-2">
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">WiFi</span>
                        </div>
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">Washing Machine</span>
                        </div>
                        <div className="d-flex align-center gap-icon-text">
                            <span className="material-symbols-outlined radio-button">radio_button_unchecked</span>
                            <span className="place-offers-text">Patio or Balcony</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
            
        