import "./starRating.css"

import { useFilter } from "../../../context";

export const StarRating = () => {

    const stars = [ "1 & up", "2 & up", "3 & up", "4 & up", "5" ];

    const { starRating, dispatchFilter } = useFilter();

    const handleStarRating = (star) => {

        dispatchFilter({
            type: "star_Rating",
            payload: star
        })
    };

    console.log(`${starRating} is the star Rating.`);

    return (
        <>
            <p className="topText">Star Rating</p>
            <div>
                { stars.map((star) => (<button className={(star===starRating)? "buttonStar_filled": "buttonStar"} onClick={ () => handleStarRating(star) }>{ star }</button>)) }
            </div>
        </>
    )
};