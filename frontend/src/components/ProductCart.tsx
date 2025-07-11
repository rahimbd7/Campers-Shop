const ProductCart = ({ cartData }) => {
    const { _id,description, brand, name, price, image, rating } = cartData || {};
  return (
    <div>
      <div className="card bg-base-100 w-80- shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={`https://i.ibb.co/LzSKdMR/audi-TT.jpg`}
            alt={name}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title  justify-center">{name}</h2>
          <p className="text-sm text-justify p-5">
           {description}
          </p>
          <div className="card-actions flex justify-between gap-20 ">
           <p className="font-bold text-xl badge badge-sm badge-info p-5">${price} </p>
            <button className="btn btn-primary">Add to Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
