import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useFilter } from "../../../context";

function valuetext(value) {
    return `${value}`;
  }

export const PriceCard = () => {

    const { priceRange, dispatchFilter } = useFilter();

    const handleChange = (event) => {
        
        dispatchFilter({
          type: "Price_Range",
          payload: event.target.value
        });
    };

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
                color: '#57a715',
                '& .MuiSlider-thumb': {
                  transform: 'translateY(22px)', 
                },
                '& .MuiSlider-track': {
                  transform: 'translateY(30px)', 
                },
                '& .MuiSlider-rail': {
                  transform: 'translateY(30px)', 
                },
              }}
              min={200}
              max={25000}
            />
          </Box>
        </div>
      );

}
