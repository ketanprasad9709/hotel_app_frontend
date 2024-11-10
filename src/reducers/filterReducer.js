import { PropertyType } from "../components/filters/propertyType/propertyType";

export const filterReducer = (state, {type, payload}) => {

    switch(type){
        case "filter_Modal":
            return{
                ...state,
                filterModalStatus: !state.filterModalStatus
            };
        case "Price_Range":
            return{
                ...state,
                priceRange: payload
            }
        case "bedrooms":
            return{
                ...state,
                bedrooms: payload
            }
        case "beds":
            return{
                ...state,
                beds: payload
            }
        case "bathrooms":
            return{
                ...state,
                bathrooms: payload
            }
        case "propertyType":
            return{
                ...state,
                propertyType: payload
            }
        case "star_Rating":
            return{
                ...state,
                starRating: payload
            }
        case "free_cancellation":
            return{
                ...state,
                freeCancellation: payload
            }
        case "Apply_status":
            return{
                ...state,
                apply_status: true
            }
        case "reset_apply_status":
            return{
                ...state,
                apply_status: false
            }
        case "clear_all":
            return{
                ...state,
                priceRange: [200, 15000],
                bedrooms: null,
                beds: null,
                bathrooms: null,
                propertyType: null,
                starRating: null,
                freeCancellation: true
            }

    };
};
        