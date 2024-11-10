import "./propertyType.css"

import { useFilter } from "../../../context";

export const PropertyType = () => {
    
    const types = [ "House", "Guest House", "Flat", "Hotel" ];

    const { propertyType, dispatchFilter } = useFilter();

    const handlePropertyType = (type) => {

        dispatchFilter({
            type: "propertyType",
            payload: type
        })
    };
    
    console.log(`${propertyType} is the property type.`);

    return ( 
        <div>
            <p className="topText">Property Type</p>
            { types.map((type) => (<button className={(type===propertyType)? "typeButtons_filled": "typeButtons"} onClick={() => handlePropertyType(type)}>{ type }</button>)) }
        </div>
    )
};