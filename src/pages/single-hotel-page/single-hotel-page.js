import axios from "axios";
import { Fragment } from "react";
import { Navbar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

import "./single-hotel-page.css";

import { HotelImages, Price, AuthBox, WishlistLogout, SearchStayWithDate, SearchList, HotelDetails } from "../../components";
import { useLoginSignUp, useWishlist, useSearch } from "../../context";

export const SingleHotelPage = () => {

    const [loadedData, setLoadedData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { access_token, login_signUp_modalStatus, signUp_postData_status, dispatchLogin_SignUp } = useLoginSignUp();
    const { wishlistModal } = useWishlist();
    const { single_hotel_data, searchListModal, searchModalStatus, destination, dispatchSearch } = useSearch();

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try{
                const { data } = await axios.get(`https://hotels-app-k5v8.onrender.com/api/hotels/${id}`);
                dispatchSearch({
                    type: "single_hotel_data_load",
                    payload: data
                })
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        })()
    },[id]);

    
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

    useEffect(() => {

        if(signUp_postData_status){
            
            alert("You have signed-in succesfully...");
            dispatchLogin_SignUp({
                type: "signUp_data_post"
            })
        }

    }, [signUp_postData_status]);

    const uniqueDestinations = Array.from(new Map(loadedData.map(item => [item.city, item])).values());

    const handleClickedDestination = (addrss) => {
        dispatchSearch({
            type: "Clicked_Destination",
            payload: addrss
        });
    };

    if(loading){
        return (
            <>
                <Navbar />
                <p className="Loading-data d-flex align-center">Loading hotel details...</p>
            </>
        )
    };

    

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
            <main className="single-hotel-page">
                <p className="hotel-name-2">{single_hotel_data.name}, {single_hotel_data.address}</p>
                <HotelImages singleHotelElement={single_hotel_data} />
                <div className="hotel-details d-flex">
                    <div>
                        <HotelDetails singleHotelElement={single_hotel_data} />
                    </div>
                    <div className="price-box">
                        <Price singleHotelElement={single_hotel_data} />
                    </div>
                </div>
            </main>
            <ToastContainer />
        </Fragment>
    )
};




                    
                    
            
            
            