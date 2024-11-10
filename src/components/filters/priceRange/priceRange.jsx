import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useFilter } from "../../../context";

function valuetext(value) {
    return `${value}`;
  }

export const PriceCard = () => {

    const { priceRange, dispatchFilter } = useFilter();

    /*const [value, setValue] = useState([200, 15000]);*/

    const handleChange = (event) => {
        
        dispatchFilter({
          type: "Price_Range",
          payload: event.target.value
        });
    };

    console.log(`${priceRange} is the new price range value.`);


    return (
        <div>
          <p className="topText">Price Range</p>
          <Box className="slider-box" sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              sx={{
                color: '#57a715'
              }}
              min={200}
              max={25000}
            />
          </Box>
        </div>
      );

}