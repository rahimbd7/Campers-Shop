import { motion } from "framer-motion";
import BestSelling from "../../components/BestSelling";
import Category from "../../components/Category";
import FAQ from "../../components/FAQ";
import FeaturedProduct from "../../components/FeaturedProduct";
import Slider from "../../components/Slider";
import Testimonals from "../../components/Testimonals";

const Home = () => {
  // Animation variants for reusability
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <Slider />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <BestSelling />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Category />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <FeaturedProduct />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Testimonals />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <FAQ />
      </motion.div>
    </div>
  );
};

export default Home;
