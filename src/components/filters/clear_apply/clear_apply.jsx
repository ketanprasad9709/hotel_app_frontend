import "./clear_apply.css"

import { useFilter } from "../../../context";

export const ClearApply = () => {

    const { apply_status, filterModalStatus, dispatchFilter } = useFilter();

    const handleApply = () => {

        dispatchFilter({
            type: "Apply_status"
        });
        dispatchFilter({
            type: "filter_Modal"
        });
    }

    const handleClearAll = () => {

        dispatchFilter({
            type: "clear_all"
        })
    }

    console.log(`${apply_status} is the apply status.`);

    return (
        <div className="d-flex align-center bottom_part">
            <button className="button_bottom" onClick={handleClearAll}>Clear All</button>
            <button onClick={handleApply} className="apply">Apply</button>
        </div>
    )
}