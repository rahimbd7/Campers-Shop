import { useParams } from "react-router-dom";

     
     const ProductsByCategory = () => {
        const { id} = useParams();
        console.log(`getting params`,id);
        return (
            <div>
                
            </div>
        );
     };
     
     export default ProductsByCategory;