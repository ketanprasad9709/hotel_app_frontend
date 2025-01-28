import DatePicker from "react-datepicker";

import "./dateEnabler.css"
import "react-datepicker/dist/react-datepicker.css";

import { useSearch } from "../../context";
import { useEffect } from "react";

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

    useEffect(() => {
        if(checkInDate && checkOutDate && checkOutDate < checkInDate){
            dispatchSearch({
                type: "Set_CheckOut_Date",
                payload: null
            })}
    }, [checkInDate, checkOutDate]);

    const addOneDay= (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    };

    return (
        <DatePicker 
        className="date-container react-datepicker-wrapper" 
        selected={typeOf==="checkIn" ? checkInDate: checkOutDate}
        onFocus={handleSearchResultModal} 
        dateFormat="dd/MM/yyyy" 
        placeholderText="Add date" 
        closeOnScroll={true} 
        minDate={typeOf==="checkIn" ? new Date(): checkInDate && addOneDay(checkInDate)}
        onChange={(date) => handleDateChange(date)}
        onKeyDown={(e) => e.preventDefault()} />
    )
}
        
        
        