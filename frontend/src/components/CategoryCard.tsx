import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();
  const { _id, name, description, icon } = categoryData || {};

  const handleCategoryProduct = (id, name) => {
    navigate(`/products_by_category/${id}`, { state: { name } });
  };

  return (
    <div
      onClick={() => handleCategoryProduct(`${_id}`, `${name}`)}
      className="flex justify-center"
    >
      <div className="card bg-base-100 w-2/3 shadow-sm hover:shadow-md transition-shadow duration-300">
        <figure className="">
          <img
            src={icon}
            alt={name}
            className="w-full h-40 object-cover sm:h-44 md:h-48 lg:h-56 rounded-sm"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-md  lg:text-xl font-semibold text-[#605DFF]">
            {name}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
