import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Home.css"
import { Navbar, HotelCard, Categories, SearchStayWithDate, SearchList, FilterBox, AuthBox, WishlistLogout } from "../../components";
import { useCategory } from "../../context";
import { useSearch, useFilter, useLoginSignUp, useWishlist } from "../../context";
import { StarRating } from "../../components/filters/starRating/starRating";

export const Home = () => {
    const [hasMore, sethasMore] = useState(true);
    const [currentIndex, setcurrentIndex] = useState(16);
    const [testData, settestData] = useState([]);
    const [hotels, sethotels] = useState([]);
    const [loadedData, setLoadedData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);

    const { state } = useCategory();
    const { destination, searchModalStatus, searchListModal, dispatchSearch } = useSearch();
    const { filterModalStatus, priceRange, bedrooms, beds, bathrooms, propertyType, starRating, freeCancellation, apply_status } = useFilter();
    const { access_token, login_signUp_modalStatus } = useLoginSignUp();
    const { wishlistModal } = useWishlist();

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

    /*useEffect(() => {
        if(loadedData) {
            const filteredData = loadedData.filter(item => item.category === state);
            settestData(filteredData);
            
        }
    }, [state, loadedData]);

    useEffect(() => {
        if(testData) {
            const superFilteredData = testData.filter(item => ((item.price >= priceRange[0] && item.price <= priceRange[1]) && (bedrooms ? item.numberOfBedrooms === Number(bedrooms): true) && (bathrooms? item.numberOfBathrooms === Number(bathrooms): true) && (beds? item.numberOfBeds === Number(beds): true)));

            sethotels(superFilteredData ? superFilteredData.slice(0, 16): []);

            dispatchSearch({
                type: "Update hotel data",
                payload: loadedData
            });
        }
    }, [apply_status]);*/

    useEffect(() => {
        if(loadedData && apply_status) {
            const superFilteredData = loadedData.filter(item => ((item.category === state) && (item.price >= priceRange[0] && item.price <= priceRange[1]) && ((bedrooms?((bedrooms === "Any")? true: ((bedrooms === "5+")? item.numberOfBedrooms >= 5: item.numberOfBedrooms === Number(bedrooms))): true) || (bathrooms?((bathrooms === "Any")? true: ((bathrooms === "5+")? item.numberOfBathrooms >= 5: item.numberOfBathrooms === Number(bathrooms))): true) || (beds?((beds === "Any")? true: ((beds === "5+")? item.numberOfBeds >= 5: item.numberOfBeds === Number(beds))): true)) && (propertyType? item.propertyType === propertyType: true) && (starRating? item.rating >= Number(starRating[0]): true) && (freeCancellation? item.isCancelable === freeCancellation: item.isCancelable === false)));
            settestData(superFilteredData);

            sethotels(superFilteredData ? superFilteredData.slice(0, 16): []);

            dispatchSearch({
                type: "Update hotel data",
                payload: loadedData
            });
        
            
        } else if (loadedData) {
            const filteredData = loadedData.filter(item => item.category === state);
            settestData(filteredData);

            sethotels(filteredData ? filteredData.slice(0, 16): []);

            dispatchSearch({
                type: "Update hotel data",
                payload: loadedData
            });
        }
    }, [state, loadedData, apply_status]);

    

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
            {filterModalStatus && 
            <FilterBox />

            }
            {
                login_signUp_modalStatus && !(access_token) && <AuthBox />
            }
            {
                wishlistModal && (access_token) && <WishlistLogout />
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
            
            
            

                    
                    


            