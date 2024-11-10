import "./cancellationAvailability.css"

import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { useFilter } from "../../../context";

export const CancellationAvailability = () => {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const { freeCancellation, dispatchFilter } = useFilter();

    const handleChange = (event) => {

        dispatchFilter({
          type: "free_cancellation",
          payload: event.target.checked
        })
    }

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: green[500],
          '&:hover': {
            backgroundColor: alpha(green[500], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: green[500],
        },
      }));

    console.log(`${freeCancellation} is the cancelation status.`);

    return (
        <div className="d-flex align-center cancellation">
            <p>Free Cancellation</p>
            <GreenSwitch 
            checked= {freeCancellation}
            onChange={handleChange} 
            {...label} 
            defaultChecked color="warning" />
        </div>
    )
};