

export const searchReducer = (state, {type, payload}) => {
    switch(type) {
        case "Open_Search_Modal":
            return {
                ...state,
                searchModalStatus: !state.searchModalStatus
            };
        case "Search_List_Modal_Main":
            return {
                ...state,
                searchListModal: true
            }
        case "Search_List_Modal":
            return {
                ...state,
                searchListModal: false
            }
        case "Set_CheckIn_Date":
            return {
                ...state,
                checkInDate: payload
            };
        case "Set_CheckOut_Date":
            

            return {
                ...state,
                checkOutDate: payload
            };
        case "Destination":
            return {
                ...state,
                destination: payload
            };
        case "Clicked_Destination":
            return {
                ...state,
                destination: payload
            }
        case "No_of_guests":
            return {
                ...state,
                no_of_guests: payload
            }
        case "Increament Guest no":
            return {
                ...state,
                no_of_guests: Math.min(state.no_of_guests+1, state.max_guests)
            }
        case "Decreament Guest no":
            return {
                ...state,
                no_of_guests: Math.max(state.no_of_guests-1, 0)
            }
        case "Update hotel data":
            return {
                ...state,
                hotel_data_state: payload
            }
        default:
            return state;
    }
};