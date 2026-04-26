
import ProductInfoContainer from "@/app/_pages/product-details/ProductInfoContainer";
import RelatedProducts from "@/app/_pages/product-details/RealtedProducts";


const page = () => {
  return (
    <div>
      <ProductInfoContainer />
      {/* <AdditionalInfoTabs /> */}

      <RelatedProducts />
    </div>
  );
};

export default page;
