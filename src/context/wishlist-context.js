import { useContext, createContext, useReducer } from "react";

import { wishlistReducer } from "../reducers";

const initialState = {
    wishlistData: [],
    wishlistModal: false
};

const wishlistContext = createContext(initialState);

const WishlistProvider = ({children}) => {

    const [{wishlistData, wishlistModal}, dispatchWishlist] = useReducer(wishlistReducer, initialState);

    return (
        <wishlistContext.Provider value={{wishlistData, wishlistModal, dispatchWishlist}}>
            {children}
        </wishlistContext.Provider>
    )
}

const useWishlist = () => useContext(wishlistContext);

export { useWishlist, WishlistProvider };