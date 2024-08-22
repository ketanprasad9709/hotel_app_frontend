import axios from "axios";
import { Fragment } from "react";
import { Navbar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./single-hotel-page.css";
import { HotelImages } from "../../components";
import { HotelDetails } from "../../components";
import { Price } from "../../components";




export const SingleHotelPage = () => {

    const [singleHotel, setSingleHotel] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get(`https://hotels-app-k5v8.onrender.com/api/hotels/${id}`);
                setSingleHotel(data);
            }catch(err){
                console.log(err);
            }
        })()
    },[id]);

    return (
        <Fragment>
            <Navbar />
            <main className="single-hotel-page">
                <p className="hotel-name-2">{singleHotel.name}, {singleHotel.address}</p>
                <HotelImages singleHotelElement={singleHotel} />
                <div className="hotel-details d-flex">
                    <div>
                        <HotelDetails singleHotelElement={singleHotel} />
                    </div>
                    <div className="price-box">
                        <Price singleHotelElement={singleHotel} />
                    </div>
                </div>
            </main>
        </Fragment>
    )
};
                    
                    
            
            
            