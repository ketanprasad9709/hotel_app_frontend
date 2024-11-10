import { Fragment } from "react";
import "./filter.css";

import { PriceCard } from "./priceRange/priceRange";
import { RoomsBeds } from "./roomsBeds/roomsBeds";
import { PropertyType } from "./propertyType/propertyType";
import { StarRating } from "./starRating/starRating";
import { CancellationAvailability } from "./cancellationAvailability/cancellationAvailability";
import { ClearApply } from "./clear_apply/clear_apply";
import { TopLine } from "./topLine/topLine";

export const FilterBox = () => {
    
    return(
        <div className="filter_outer">
            <div className="filter_box">
                <TopLine />
                <PriceCard />
                <RoomsBeds />
                <PropertyType />
                <StarRating />
                <CancellationAvailability />
                <ClearApply />
            </div>
        </div>
    )

}
