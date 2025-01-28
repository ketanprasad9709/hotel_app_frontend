import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "./SearchResultPage.css";

import { Navbar, HotelCard, AuthBox, WishlistLogout, SearchStayWithDate, SearchList } from "../../components";
import { useSearch, useLoginSignUp, useWishlist } from "../../context";


export const SearchResultPage = () => {

    const [loadedData, setLoadedData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const { destination_selected } = useParams();

    const { hotel_data_state, searchListModal, searchModalStatus, destination, dispatchSearch } = useSearch();
    const { access_token, login_signUp_modalStatus, signUp_postData_status, dispatchLogin_SignUp } = useLoginSignUp();
    const { wishlistModal } = useWishlist();

    useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get("https://hotels-app-k5v8.onrender.com/api/hotels");
                setLoadedData(data);
            }catch(err){
                console.log(err);
            }
        })()
    }, []);

    useEffect(() => {
        if(loadedData) {
            const searchFilteredHotelData = uniqueDestinations.filter(item => item.address.toLowerCase().includes(destination.toLowerCase()) || item.city.toLowerCase().includes(destination.toLowerCase()));
            setSearchFilteredData(searchFilteredHotelData);
        }
    }, [destination]);

    useEffect(() => {
        const filteredData = hotel_data_state.filter(item => item.address==destination_selected);
        setSearchResult(filteredData);
    }, [hotel_data_state, destination_selected]);

    const hasShownLoginToast = useRef(false);
    const hasShownLogoutToast = useRef(false);

    
    useEffect(() => {

        if(access_token && !hasShownLoginToast.current){
            toast.success("You have been logged in succesfully!", {className: "toast-notify-login", position: 'bottom-center'});
            hasShownLoginToast.current = true;
            hasShownLogoutToast.current = false;
        }
        
    }, [access_token])

    useEffect(() => {
        if(!access_token && !hasShownLogoutToast.current){
            toast.success("You have been logged out succesfully!", {className: "toast-notify-logout", position: 'bottom-center'});
            hasShownLogoutToast.current = true;
            hasShownLoginToast.current = false;
        }}, [access_token]);

    const handleClickedDestination = (addrss) => {
        dispatchSearch({
            type: "Clicked_Destination",
            payload: addrss
        });
    };

    useEffect(() => {

        if(signUp_postData_status){
            
            alert("You have signed-in succesfully...");
            dispatchLogin_SignUp({
                type: "signUp_data_post"
            })
        }

    }, [signUp_postData_status]);

    
    const uniqueDestinations = Array.from(new Map(loadedData.map(item => [item.city, item])).values());
    
    return (
        <Fragment>
            <Navbar />
            {searchModalStatus &&
            <>
                <SearchStayWithDate />
                {searchListModal && (searchFilteredData.length===0 ?
                <div className="searchList">
                    {uniqueDestinations.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
                </div>:
                <div className="searchList">
                    {searchFilteredData.map(item => <SearchList onClick={() => handleClickedDestination(item.address)} key={item._id} Hotel_Element={item}/>)}
                </div>)}
                
            </> }
            {
                login_signUp_modalStatus && !(access_token) && <AuthBox />
            }
            {
                wishlistModal && (access_token) && <WishlistLogout />
            }
            {searchResult.length>0 ?
            <main className="main d-flex align-center wrap gap-larger">
                { searchResult.map(item => <HotelCard hotel_element={item} key={item._id}/>) }
            </main> :
            <p className="no-data">
                Data not Found
            </p>}
            <ToastContainer />
        </Fragment>
    )
};
            

