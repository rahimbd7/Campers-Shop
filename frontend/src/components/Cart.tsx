import ReactStarsRating from "react-awesome-stars-rating";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Cart = ({ cartData, handleCartsToBeDisplay }) => {
  const {_id, brand, name,price, image, rating } = cartData || {};

// Remove cart from order
  const handleRemoveCart = (id) => {
    handleCartsToBeDisplay(id);
  }
  useEffect(()=>{
    AOS.init();
  },[]);


  return (
    <div>
      <div data-aos = 'flip-left' className="overflow-hidden card border border-[#00A4EF] card-compact w-96 md:w-[360px] lg:w-96 bg-base-100 shadow-xl rounded-md space-y-5">
        <figure>
          <img src={image} alt="Shoes" className="w-full h-[200px]" />
        </figure>
        <div className="card-body ">
          <div className="flex justify-between">
            <h2 className="card-title text-2xl text-[#00A4EF]">{name}</h2>
            <ReactStarsRating
              value={parseInt(rating)}
              className="flex "
              primaryColor="#00A4EF"
              isEdit={false}
            />
          </div>
          <div className="flex justify-between">
            <h2 className="badge badge-info rounded-md text-xl p-5 font-bold text-white">
              {brand}
            </h2>
            <h2 className="badge badge-info rounded-md text-xl p-5 font-bold text-white">
              $ {price}
            </h2>
          </div>

          <div className="card-actions flex justify-between items-center py-3">
            <button onClick={()=>handleRemoveCart(_id)} className="btn btn-error text-white text-lg font-medium">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartData: PropTypes.object.isRequired,
  handleCartsToBeDisplay: PropTypes.func.isRequired
};

export default Cart;
