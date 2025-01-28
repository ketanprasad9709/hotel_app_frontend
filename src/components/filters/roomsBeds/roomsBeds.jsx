import "./roomsBeds.css";

import { useFilter } from "../../../context";

export const RoomsBeds = () => {
    
    const numbers = [ "Any", "1", "2", "3", "4", "5+" ];

    const { bedrooms, beds, bathrooms, dispatchFilter } = useFilter();

    const handleBedroomsClick = (number) => {
        
        dispatchFilter({
            type: "bedrooms",
            payload: number
        })
    }

    const handleBedsClick = (number) => {

        dispatchFilter({
            type: "beds",
            payload: number
        })
    }

    const handleBathroomsClick = (number) => {

        dispatchFilter({
            type: "bathrooms",
            payload: number
        })
    }

    return (
        <>
            <p className="topText rooms-text">Rooms & Beds</p>
            <div className="d-flex align-center">
                
                <div className="room_details_text">
                    <p>Bedrooms</p>
                    <p>Beds</p>
                    <p>Bathrooms</p>
                </div>
                <div>
                    <div>
                        { numbers.map((number) => (<button className={(number===bedrooms)? "buttons_filled": "buttons"} onClick={() => handleBedroomsClick(number)}>{number}</button>)) }
                    </div>
                    <div>
                        { numbers.map((number) => (<button className={(number===beds)? "buttons_filled": "buttons"} onClick={() => handleBedsClick(number)}>{number}</button>)) }
                    </div>
                    <div>
                        { numbers.map((number) => (<button className={(number===bathrooms)? "buttons_filled": "buttons"} onClick={() => handleBathroomsClick(number)}>{number}</button>)) }
                    </div>
                </div>
            </div>
        </>
    )

}
