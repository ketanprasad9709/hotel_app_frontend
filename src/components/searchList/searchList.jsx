import "./searchList.css";

export const SearchList = ({onClick, Hotel_Element}) => {
    return (
        <p className="searchLine" onClick={onClick}>{Hotel_Element.address}, {Hotel_Element.city}</p>
    )
};