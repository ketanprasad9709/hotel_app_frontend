import "./HotelImages.css"

export const HotelImages = ({singleHotelElement}) => {

    const { image, imageArr } = singleHotelElement;

    return (
        <div className="d-flex gap-small-2 align-center hotel-image-container">
            <div className="primary-image-container">
                <img className="parent-image" src={image} alt="hotel-img"/> 
            </div>
            <div className="child-image-group d-flex wrap gap-small">
                {imageArr && imageArr.map(image => <img key={image} className="hotel-img" src={image} alt="hotel-img" />)}
            </div>
        </div>
    )
}