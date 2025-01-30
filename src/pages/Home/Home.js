import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import * as ReactToastify from 'react-toastify';

import "./Home.css";

import { Navbar, HotelCard, Categories, SearchStayWithDate, SearchList, FilterBox, AuthBox, WishlistLogout } from "../../components";
import { useSearch, useFilter, useLoginSignUp, useWishlist, useCategory } from "../../context";

export const Home = () => {
    const { ToastContainer, toast } = ReactToastify;

    const [hasMore, sethasMore] = useState(true);
    const [currentIndex, setcurrentIndex] = useState(16);
    const [testData, settestData] = useState([]);
    const [hotels, sethotels] = useState([]);
    const [loadedData, setLoadedData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);
    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    const { state } = useCategory();
    const { destination, searchModalStatus, searchListModal, dispatchSearch } = useSearch();
    const { filterModalStatus, priceRange, bedrooms, beds, bathrooms, propertyType, starRating, freeCancellation, apply_status } = useFilter();
    const { access_token, signUp_postData_status, login_signUp_modalStatus, signup_test, hasShownLoginToast, hasShownLogoutToast, dispatchLogin_SignUp } = useLoginSignUp();
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
                const { data } = await axios.get("https://hotels-app-1088011548952.asia-south2.run.app/api/hotels");
                setLoadedData(data);
            }catch(err){
                console.log(err);
            }
        })()
    }, []);

    useEffect(() => {
        if(loadedData && apply_status) {
            const superFilteredData = loadedData.filter(item => ((item.category === state) && 
            (item.price >= priceRange[0] && item.price <= priceRange[1]) && 
            ((bedrooms?((bedrooms === "Any")? true: ((bedrooms === "5+")? item.numberOfBedrooms >= 5: item.numberOfBedrooms === Number(bedrooms))): true) || 
            (bathrooms?((bathrooms === "Any")? true: ((bathrooms === "5+")? item.numberOfBathrooms >= 5: item.numberOfBathrooms === Number(bathrooms))): true) || 
            (beds?((beds === "Any")? true: ((beds === "5+")? item.numberOfBeds >= 5: item.numberOfBeds === Number(beds))): true)) &&
            (propertyType? item.propertyType === propertyType: true) && 
            (starRating? item.rating >= Number(starRating[0]): true) && 
            (freeCancellation? item.isCancelable === freeCancellation: item.isCancelable === false)));

            
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
            const searchFilteredHotelData = uniqueDestinations.filter(item => item.address.toLowerCase().includes(destination.toLowerCase()) || item.city.toLowerCase().includes(destination.toLowerCase()));
            setSearchFilteredData(searchFilteredHotelData);
        }
    }, [destination]);

    
    useEffect(() => {

        if(access_token && !hasShownLoginToast){
            toast.success("You have been logged in succesfully...", {className: "toast-notify-logout", position: 'bottom-center'});
            dispatchLogin_SignUp({
                type: "hasShownLoginToast-handle" });
            dispatchLogin_SignUp({
                type: "hasShownLogoutToast-handle" });
        }
        
    }, [access_token])

    useEffect(() => {
        if(!access_token && hasShownLogoutToast){
            toast.success("You have been logged out succesfully...", {className: "toast-notify-logout", position: 'bottom-center'});
            dispatchLogin_SignUp({
                type: "hasShownLogoutToast-handle" });
            dispatchLogin_SignUp({
                type: "hasShownLoginToast-handle" });
        }
    
    }, [access_token]);


    useEffect(() => {

        if(signUp_postData_status){
            
            alert("You have signed-in succesfully...");
            dispatchLogin_SignUp({
                type: "signUp_data_post"
            })
        }

    }, [signUp_postData_status]);

    useEffect(() => {

        if(signup_test){
            toast.success("User already exists...", {className: "toast-notify-user-exists", position: 'bottom-center'});
            dispatchLogin_SignUp({
                type: "sign_up_test"
            })
        }
    }, [signup_test]);

    useEffect(() => {

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        setShowFirst(true);
        setShowSecond(false);
        delay(3000).then(() => {
            setShowSecond(true);
            setShowFirst(false);
        });
    }, [state, apply_status])

    const uniqueDestinations = Array.from(new Map(loadedData.map(item => [item.city, item])).values());

    return (
        <Fragment>
            <Navbar />
            <Categories/>
            {searchModalStatus &&
            <>
            <SearchStayWithDate />
            {searchListModal && (destination.length===0 ?
            (<div className="searchList">
                {uniqueDestinations.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
            </div>): (searchFilteredData.length===0 ? (<></>) : 
            (<div className="searchList">
                {searchFilteredData.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
            </div>)))
            }
            
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
                        loader={hotels.length > 0 && hotels.length >= 16 && <h3 className="loading">Loading...</h3>}
                        endMessage={hotels.length >= testData.length &&
                            <p className="end-line" style={{ textAlign: 'center' }}>
                                <b>End of Page...</b>
                            </p>
                        }
                    >
                    <main className="main d-flex align-center wrap gap-larger">
                        {hotels && hotels.map(hotel => <HotelCard key={hotel._id} hotel_element={hotel}/>)}
                    </main>
                    </InfiniteScroll>) : ((showFirst ? <p className="NoData">Loading...</p> : (showSecond && <p className="NoData">No data found...</p>)))
            }
            <ToastContainer />
        </Fragment>
    )
};
    

            
            
            

                    
                    


            
