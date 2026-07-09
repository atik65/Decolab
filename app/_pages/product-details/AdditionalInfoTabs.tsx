import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ChevronRight } from "lucide-react"; // Import Lucide icon
import ImageZoomViewModal from "@/components/shared/ImageZoomViewModal";

const tabs = [
  {
    id: 1,
    title: "Description",
  },
  //   {
  //     id: 2,
  //     title: "Shipping Information",
  //   },
  {
    id: 3,
    title: "Additional Information",
  },
];

const AdditionalInfoTabs = () => {
  return (
    <Tabs defaultValue="1" className="w-full mt-10 md:mt-16 ">
      <TabsList className="w-full bg-white border-t sm:gap-5  overflow-x-auto md:overflow-x-scroll justify-start md:justify-center h-full">
        {tabs.map((tab) => (
          <TabsTrigger
            className="text-base md:text-lg -mt-1 font-bold border-t-[3px] border-transparent text-gray-500 hover:text-gray-900 duration-200 data-[state=active]:text-brand-secondary data-[state=active]:border-brand-secondary rounded-none py-3 uppercase"
            key={tab.id}
            value={tab.id.toString()}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* <TabsContent value="info">Info</TabsContent>
      <TabsContent value="shipping">Shipping</TabsContent>
      <TabsContent value="returns">Returns</TabsContent> */}
      {tabs.map((tab) => (
        <TabsContent
          className="container mx-auto "
          key={tab.id}
          value={tab.id.toString()}
        >
          {tab.title === "Description" && <DescriptionInfo />}
          {tab.title === "Shipping Information" && <ShippingInfo />}
          {tab.title === "Additional Information" && <AdditionalInfo />}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdditionalInfoTabs;

const DescriptionInfo = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">VESTIBULUM TEMPUS METUS</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bullet Points */}
        <ul className="list-none pl-0 ">
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Lorem ipsum dolor
            sit amet, conse.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Aliquam tincidunt
            mauris eu risus.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Vestibulum{" "}
            <strong>auctor dapibus</strong> neque.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Nunc dignissim
            risus id metus.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Cras ornare
            tristique elit.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Vivamus vestibulum
            nulla nec ante.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Praesent placerat
            risus quis eros.
          </li>
          <li className="mb-2">
            <ChevronRight className="inline w-4 h-4 mr-2" /> Elegant design with
            premium finish.
          </li>
        </ul>

        {/* Images */}
        <div className="flex justify-center gap-8 ">
          {/* First Image */}
          <div className="w-full relative">
            {/* <Image
              src="/images/home/banner14.jpg" // Replace with your image path
              alt="Wooden Chair"
              height={500}
              width={500}
              quality={100}
              objectFit="cover"
            /> */}
            <ImageZoomViewModal imgURI="/images/home/banner14.jpg" />
          </div>

          {/* Second Image */}
          <div className="w-full ">
            <ImageZoomViewModal imgURI="/images/home/banner9.jpg" />
          </div>
        </div>
      </section>

      {/* Additional Text */}
      <p className="mb-2">
        Commodo parturient tincidunt condimentum vestibulum
      </p>
      <p>
        <strong>dolor laoreet</strong> eros suspen disse magna torquent ac
        condimentum arcu <strong>parturient</strong> nec disse magna torquent ac
        condi mentum arcu parturient nec.
      </p>
    </div>
  );
};

const ShippingInfo = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-3">Shipping & Delivery</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <ChevronRight className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-medium">
                Standard Shipping (3-7 business days)
              </h4>
              <p className="text-gray-600">Free shipping on orders over $100</p>
              <p className="text-gray-600">$9.99 for orders under $100</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <ChevronRight className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-medium">
                Express Shipping (1-3 business days)
              </h4>
              <p className="text-gray-600">$19.99 flat rate</p>
              <p className="text-gray-600">Available for most locations</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Shipping Restrictions</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>We currently ship within the United States only</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>Some remote areas may require additional delivery time</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>
              P.O. boxes and APO/FPO addresses are not eligible for express
              shipping
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Order Tracking</h3>
        <p className="text-gray-600 mb-2">
          Once your order ships, you will receive a confirmation email with
          tracking information. You can track your order status at any time
          through your account dashboard.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Shipping Policy</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>Orders are processed within 1-2 business days</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>Delivery times are estimates and not guaranteed</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>Additional fees may apply for oversized items</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>International shipping is not available at this time</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

const AdditionalInfo = () => {
  return (
    <div className="space-y-8 container mx-auto px-5">
      {/* Ramadan Crescent Moon */}
      <section className="border rounded-lg p-6 bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-brand-secondary">Ramadan Crescent Moon</h3>
        
        <div className="space-y-6">
          {/* Product Description */}
          <div>
            <p className="text-gray-700">
              Crafted from high-quality aluminum with a layer of acrylic behind the Aluminum.
              The Ramadan Crescent Moon withstand the elements, backed by a 1-year warranty on the light
              and 5 years on the paint for your peace of mind.
            </p>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-lg font-medium mb-2 text-brand-secondary">Delivery & Installation</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Your order will be delivered and installed within 3 days or less</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Enjoy free delivery and installation by our team of experts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Wall-Mounted House Numbers */}
      <section className="border rounded-lg p-6 bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-brand-secondary">Aluminum House Numbers</h3>
        
        <div className="space-y-6">
          {/* Product Description */}
          <div>
            <p className="text-gray-700">
              Crafted from high-quality aluminum with a layer of acrylic behind the Aluminum.
              The house numbers withstand the elements, backed by a 1-year warranty on the light
              and 5 years on the paint for your peace of mind.
            </p>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-lg font-medium mb-2 text-brand-secondary">Delivery & Installation</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Your order will be delivered and installed within a week or less</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Enjoy free delivery and installation by our team of experts</span>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-brand-secondary/5 p-4 rounded-lg border border-brand-secondary">
            <h4 className="text-lg font-medium mb-2 text-brand-secondary">Important Note</h4>
            <p className="text-gray-700">
              The customer is responsible for providing a properly placed electrical connection.
              We are not responsible for installing or supplying the electrical point needed for this product.
            </p>
          </div>
        </div>
      </section>

      {/* Double-Sided House Numbers */}
      <section className="border rounded-lg p-6 bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-brand-secondary">Double-Sided House Numbers</h3>
        
        <div className="space-y-6">
          {/* Product Description */}
          <div>
            <p className="text-gray-700">
              Crafted from high-quality aluminum with a layer of acrylic behind the Aluminum.
              The house numbers withstand the elements, backed by a 1-year warranty on the light
              and 5 years on the paint for your peace of mind. Specially designed for installation
              on Car Parking Umbrellas.
            </p>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-lg font-medium mb-2 text-brand-secondary">Delivery & Installation</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Your order will be delivered and installed within a week or less</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-brand-secondary" />
                <span>Enjoy free delivery and installation by our team of experts</span>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-brand-secondary/5 p-4 rounded-lg border border-brand-secondary">
            <h4 className="text-lg font-medium mb-2 text-brand-secondary">Important Note</h4>
            <p className="text-gray-700">
              The customer is responsible for providing a properly placed electrical connection.
              We are not responsible for installing or supplying the electrical point needed for this product.
            </p>
          </div>
        </div>
      </section>

      {/* Order Process - Common for all products */}
      <section className="bg-brand-secondary/5 p-6 rounded-lg border border-brand-secondary">
        <h3 className="text-xl font-semibold mb-3 text-brand-secondary">Order Process</h3>
        <p className="text-gray-700">
          Dear customer, after purchasing, the design department will contact you in 10 minutes or less
          to confirm your design before starting manufacturing.
        </p>
      </section>
    </div>
  );
};
