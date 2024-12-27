import axios from "axios"; 

export const wishlistHandler = async(_id, userid, token) => {

    try{

        const config = { headers : { authorization : token } };

        const data = await axios.post("https://hotels-app-k5v8.onrender.com/api/wishlist", 
            {
                userID: userid,
                hotelID: _id
            },
            config
        )

        console.log("Wishlist is added.");
        console.log(data);
    }catch(err){
        console.log("Unable to add to wishlist.");
    }
    
};

export const getWishlistHandler = async(userid, token) => {

    try{

        const config = { headers : { userid: userid } };
        config.headers.authorization = token;

        const {data} = await axios.get("https://hotels-app-k5v8.onrender.com/api/wishlist",
            config
        );

        const hotelIDS = data.map(item => item.hotelID);

        console.log("Wishlist found.");
        console.log(hotelIDS);
        return hotelIDS;

    }catch(err){
        console.log("Wishlist data not found.");
    }
};

export const deleteWishlistHandler = async(_id, userid, token) => {

    try{

        const config = { headers : { userid: userid } };
        config.headers.authorization = token;

        const data = await axios.delete(`https://hotels-app-k5v8.onrender.com/api/wishlist/${_id}`,
            config
        );

        console.log(data);
    
    }catch(err){
        console.log("Failed to delete wishlist ID.");
    }
}