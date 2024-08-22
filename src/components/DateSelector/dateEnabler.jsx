import "./dateEnabler.css"
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
//import { useState } from "react";

import { useSearch } from "../../context";

export const DateSelector = ({typeOf}) => {
    
    const { checkInDate, checkOutDate, dispatchSearch } = useSearch();

    const handleDateChange = (date) => {
        dispatchSearch({
            type: typeOf==="checkIn" ? "Set_CheckIn_Date": "Set_CheckOut_Date",
            payload: date
        });
    };

    const handleSearchResultModal = () => {
        dispatchSearch({
            type: "Search_List_Modal"
        });
    };
    
    console.log({checkInDate, checkOutDate});

    return (
        <DatePicker 
        className="date-container react-datepicker-wrapper" 
        selected={typeOf==="checkIn" ? checkInDate: checkOutDate}
        onFocus={handleSearchResultModal} 
        dateFormat="dd/MM/yyyy" 
        placeholderText="Add date" 
        closeOnScroll={true} 
        minDate={new Date()}
        onChange={(date) => handleDateChange(date)} />
    )
}
        