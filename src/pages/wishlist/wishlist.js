import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./wishlist.css"

import { Navbar, HotelCard, WishlistLogout } from "../../components";
import { useWishlist, useLoginSignUp } from "../../context";


export const Wishlist = () => {

    const navigate = useNavigate();

    const { wishlistData, wishlistModal } = useWishlist();
    const { access_token } = useLoginSignUp();

    const [hotels, setHotels] = useState([]);
    const [wishlistHotels, setWishlistHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                const { data } = await axios.get("https://hotels-app-k5v8.onrender.com/api/hotels");
                setHotels(data);
            }catch(err){
                console.log("Data not found.");
            }finally{
                setLoading(false);
            }
        })()}
    , [])

    console.log(hotels);

    useEffect(() => {

        const wishListHotelData = wishlistData.map(ID => hotels.find(hotel => hotel._id == ID));
        setWishlistHotels(wishListHotelData);
        }
    , [hotels, wishlistData])
        
    console.log(wishlistHotels);

    if(!access_token){
        return (
            <p className="not_authorized">You are not authorized.</p>
        )
    }

    if(loading){
        return(
            <Fragment>
                <Navbar />
                <div className="wishlist-loading d-flex">
                    <p>Loading your wishlist items...</p>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Navbar />
            {
                wishlistModal && (access_token) && <WishlistLogout />
            }
            {wishlistHotels && (wishlistHotels[0] !== undefined) ? (
            <main className="main-wishlist d-flex align-center wrap gap-larger-wishlist">
                {wishlistHotels && wishlistHotels.map(hotel => <HotelCard key={hotel._id} hotel_element={hotel}/>)}
            </main>)
            : (<div className="empty-wishlist d-flex">
                <p>Your Wishlist is empty!</p>
            </div>)}
        </Fragment>
    )
};