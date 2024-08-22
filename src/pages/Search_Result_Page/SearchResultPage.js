import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./SearchResultPage.css";

import { Navbar, HotelCard, SearchStayWithDate, SearchList } from "../../components";
import { useSearch } from "../../context";


export const SearchResultPage = () => {
    
    const [loadedData, setLoadedData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const { destination } = useParams();
    const { hotel_data_state } = useSearch();

    /*useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get("https://hotels-app-k5v8.onrender.com/api/hotels");
                setLoadedData(data);

                
                //const filteredData = data.filter(item => item.category === state);
                //settestData(filteredData);
                //sethotels(filteredData ? filteredData.slice(0, 16): []);
            }catch(err){
                console.log(err);
            }
        })()
    }, []);*/

    useEffect(() => {
        const filteredData = hotel_data_state.filter(item => item.address==destination);
        setSearchResult(filteredData);
    }, [hotel_data_state]);

    console.log(searchResult);
    
    return (
        <Fragment>
            <Navbar />
            {searchResult.length>0 ?
            <main className="main d-flex align-center wrap gap-larger">
                { searchResult.map(item => <HotelCard hotel_element={item} key={item._id}/>) }
            </main> :
            <p className="no-data">
                Data not Found
            </p>}
        </Fragment>
    )
};
            

