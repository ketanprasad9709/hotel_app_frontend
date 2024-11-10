import { createContext, useContext, useReducer } from "react";

import { filterReducer } from "./../reducers";

const initialState = { 
    priceRange: [200, 15000],
    filterModalStatus: false,
    bedrooms: null,
    beds: null,
    bathrooms: null,
    propertyType: null,
    starRating: null,
    freeCancellation: true,
    apply_status: false
};

const filterContext = createContext(initialState);

const FilterProvider = ({children}) => {

    const [{ priceRange, filterModalStatus, bedrooms, beds, bathrooms, propertyType, starRating, freeCancellation, apply_status}, dispatchFilter] = useReducer(filterReducer, initialState);

    return (
        <filterContext.Provider value={{priceRange, filterModalStatus, bedrooms, beds, bathrooms, propertyType, starRating, freeCancellation, apply_status, dispatchFilter}}>
            {children}
        </filterContext.Provider>
    )
}

const useFilter = () => useContext(filterContext);

export { FilterProvider, useFilter };