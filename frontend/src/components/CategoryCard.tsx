import {  useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();
  const { _id, name, description, icon } = categoryData || {};

  const handleCategoryProduct = (id) => {
    console.log(id);
    navigate(`/products_by_category/${id}`);
  };
  return (
    <div onClick={()=>handleCategoryProduct(`${_id}`)} className="flex justify-center border-2">
      <div className="card bg-base-100 w-2/3 shadow-sm">
        <figure>
          <img src={icon} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          {/* <div className="card-actions justify-end">
      <Link to={`/category/${id}`} className="btn btn-primary">View Products</Link>
    </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
