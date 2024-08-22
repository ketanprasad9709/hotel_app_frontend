import { useContext, useReducer, createContext } from "react";

import { searchReducer } from "./../reducers"

const initialState = {
    searchModalStatus: false,
    searchListModal: true,
    checkInDate: null,
    checkOutDate: null,
    isValidCheckOut: false,
    destination: "",
    no_of_guests: 0,
    max_guests: 8,
    hotel_data_state: []
};

const searchContext = createContext(initialState);

const SearchProvider = ({children}) => {

    const [{ searchModalStatus, searchListModal, checkInDate, checkOutDate, isValidCheckOut, destination, no_of_guests, max_guests, hotel_data_state }, dispatchSearch] = useReducer(searchReducer, initialState);
    
    return (
        <searchContext.Provider value = {{searchModalStatus, searchListModal, checkInDate, checkOutDate, isValidCheckOut, destination, no_of_guests, max_guests, hotel_data_state, dispatchSearch}}>
            {children}
        </searchContext.Provider>
    )

}

const useSearch = () => useContext(searchContext);

export { useSearch, SearchProvider };