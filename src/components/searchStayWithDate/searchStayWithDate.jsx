import "./searchStayWithDate.css"
import { DateSelector } from "./../DateSelector/dateEnabler"
import { useSearch } from "../../context";
import{ useNavigate } from "react-router-dom";

import { isAfter } from 'date-fns';

export const SearchStayWithDate = () => {

    const { destination, dispatchSearch, address_entered, no_of_guests, maxValue } = useSearch();
    const navigate = useNavigate();

    const handleDestinationResult = (event) => {
        dispatchSearch({
            type: "Destination",
            payload: event.target.value
        })
    };

    const handleGuestChange = (event) => {
        dispatchSearch({
            type: "No_of_guests",
            payload: event.target.value
        })
    }

    const handleSearchList = () => {
        dispatchSearch({
            type: "Search_List_Modal_Main"
        })
    };

    const handleSearchClick = () => {
        if(destination) {  

        navigate(`./hotels/${destination}`);
        
        dispatchSearch({
            type: "Open_Search_Modal",
        });} else {
        
        alert('The destination you entered is empty. Please provide a valid input.');}
    }

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

    const handleCheckOutDateChange = () => {
        
    }

    console.log(destination);
    console.log(`${no_of_guests} is the no of guests`);
    return (
        <div className="search-bar">
            <div className="search-container-homePage gap-search d-flex align-center ">
                <div className="search-columns">
                    <label className="top-line">Where</label>
                    <input className="destination-text" value={destination} onChange={handleDestinationResult} onFocus={handleSearchList} placeholder="Search destination" type="text" />
                </div>
                <div className="search-columns">
                    <label className="top-line">Check In</label>
                    <DateSelector typeOf="checkIn" />
                </div>
                <div className="search-columns">
                    <label className="top-line">Check Out</label>
                    <DateSelector onChange={handleCheckOutDateChange} typeOf="checkOut" />
                </div>
                <div className="search-columns">
                    <label className="top-line content">No of Guests</label>
                    <div className="d-flex align-center gap-icon-number">
                        <span class="material-symbols-outlined plus-minus" onClick={handleDecreaseGuests}>remove</span>
                        <input className="number-of-guests" onChange={handleGuestChange} type="number" defaultValue="0" value={no_of_guests} max={maxValue} readOnly />
                        <span class="material-symbols-outlined plus-minus" onClick={handleIncreaseGuests}>add</span>
                    </div>
                </div>
                <div onClick={handleSearchClick} className="search-button">
                    <span className="material-symbols-outlined search-text">search</span>
                    <span>Search</span>
                </div>
            </div>
        </div>
    )
}