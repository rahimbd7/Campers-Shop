import Category from "../../components/Category";
import FeaturedProduct from "../../components/FeaturedProduct";

import Slider from "../../components/Slider";
import Testimonals from "../../components/Testimonals";





const Home = () => {
    return (
        <div>
            <Slider/>
            <Category/>
            <FeaturedProduct/>
            <Testimonals/>
            
        </div>
    );
};

export default Home;