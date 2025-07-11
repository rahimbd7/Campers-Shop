import Category from "../../components/Category";
import FeaturedProduct from "../../components/FeaturedProduct";
import Footer from "../../components/Footer";
import Slider from "../../components/Slider";
import Testimonals from "../../components/Testimonals";





const Home = () => {
    return (
        <div>
            <Slider/>
            <Category/>
            <FeaturedProduct/>
            <Testimonals/>
            <Footer/>
        </div>
    );
};

export default Home;