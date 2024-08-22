import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Home.css"
import { Navbar, HotelCard, Categories, SearchStayWithDate, SearchList } from "../../components";
import { useCategory } from "../../context";
import { useSearch } from "../../context";

export const Home = () => {
    const [hasMore, sethasMore] = useState(true);
    const [currentIndex, setcurrentIndex] = useState(16);
    const [testData, settestData] = useState([]);
    const [hotels, sethotels] = useState([]);
    const [loadedData, setLoadedData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);

    const { state } = useCategory();
    const { destination, searchModalStatus, searchListModal, dispatchSearch } = useSearch();

    const handleClickedDestination = (addrss) => {
        dispatchSearch({
            type: "Clicked_Destination",
            payload: addrss
        });
    };

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if(loadedData) {
            const filteredData = loadedData.filter(item => item.category === state);
            settestData(filteredData);
            sethotels(filteredData ? filteredData.slice(0, 16): []);

            dispatchSearch({
                type: "Update hotel data",
                payload: loadedData
            });
        }
    }, [state, loadedData]);

    const fetchMoreData = () => {
        if(hotels.length >= testData.length){
            sethasMore(false);
            return
        }else{
            setTimeout(() => {
                if (hotels && hotels.length > 0){
                    sethotels(hotels.concat(testData.slice(currentIndex, currentIndex + 16)));
                    setcurrentIndex(curr => curr + 16);
                }else{
                    sethotels([]);
                }
            }, 1000)
        }
    }

    useEffect(() => {
        if(loadedData) {
            const searchFilteredHotelData = loadedData.filter(item => item.address.toLowerCase().includes(destination.toLowerCase()) || item.city.toLowerCase().includes(destination.toLowerCase()));
            setSearchFilteredData(searchFilteredHotelData);
        }
    }, [destination]);

    searchFilteredData.forEach(hotel => {
        console.log(hotel.address, hotel.city);
    });

    //console.log(searchFilteredData.address, searchFilteredData.city);


    return (
        <Fragment>
            <Navbar />
            <Categories/>
            {searchModalStatus &&
            <>
            <SearchStayWithDate />
            {searchListModal && (searchFilteredData.length===0 ?
            <div className="searchList">
                {loadedData.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
            </div>:
            <div className="searchList">
                {searchFilteredData.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
            </div>)}
            
            </> 
            }
            {
                hotels && hotels.length > 0 ? (
                    <InfiniteScroll
                        dataLength={hotels.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={hotels.length > 0 && <h3 className="loading">Loading...</h3>}
                        endMessage={hotels.length >= testData.length &&
                            <p className="end-line" style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                    <main className="main d-flex align-center wrap gap-larger">
                        {hotels && hotels.map(hotel => <HotelCard key={hotel._id} hotel_element={hotel}/>)}
                    </main>
                    </InfiniteScroll>) : (<></>)
            }
        </Fragment>
    )
};
            
            
            

                    
                    


            