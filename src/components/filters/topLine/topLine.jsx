import "./topLine.css";

import { useFilter } from "../../../context";

export const TopLine = () => {

    const { dispatchFilter } = useFilter();

    const handleCloseFilterBox = () => {

        dispatchFilter({
            type: "filter_Modal"
        })
    }

    return (
        <div className="d-flex align-center top_line">
            <span className="filterText">Filters</span>
            <span class="material-symbols-outlined cancel" onClick={handleCloseFilterBox}>cancel</span>
        </div>
    )
};