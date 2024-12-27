import axios from "axios";
import { Fragment } from "react";
import { Navbar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./single-hotel-page.css";
import { HotelImages } from "../../components";
import { HotelDetails } from "../../components";
import { Price, AuthBox, WishlistLogout } from "../../components";
import { useLoginSignUp, useWishlist, useSearch } from "../../context";




export const SingleHotelPage = () => {

    const { access_token, login_signUp_modalStatus } = useLoginSignUp();
    const { wishlistModal } = useWishlist();
    const { single_hotel_data, dispatchSearch } = useSearch();

    const [singleHotel, setSingleHotel] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get(`https://hotels-app-k5v8.onrender.com/api/hotels/${id}`);
                dispatchSearch({
                    type: "single_hotel_data_load",
                    payload: data
                })
            }catch(err){
                console.log(err);
            }
        })()
    },[id]);

    return (
        <Fragment>
            <Navbar />
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
        </Fragment>
    )
};
                    
                    
            
            
            