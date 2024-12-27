export const wishlistReducer = (state, {type, payload}) => {

    switch(type) {
        case "store-wishlist-data":
            return {
                ...state,
                wishlistData: [...state.wishlistData, ...payload]
            };
        case "delete-wishlist-data":
            return {
                ...state,
                wishlistData: state.wishlistData.filter(item => item !== payload)
            }
        case "reset-wishlist-data":
            return {
                ...state,
                wishlistData: []
            }
        case "Wishlist-modal":
            return{
                ...state,
                wishlistModal: !state.wishlistModal 
            }
        default:
            return state;
    }
}
