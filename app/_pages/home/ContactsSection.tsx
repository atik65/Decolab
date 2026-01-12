import React from "react";
import {
  Facebook,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LucideLinkedin,
} from "lucide-react";
import { useGetLocale } from "@/hooks/useGetLocale";

const ContactSection = () => {
  const locale = useGetLocale();
  return (
    <section className="border-y my-5 py-5 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-center  bg-white container mx-auto gap-y-10 px-4 ">
        {/* Left Section: Newsletter Subscribe */}
        <div className="w-full md:w-1/2 md:pr-16 xl:pr-32 md:border-r-2 border-r-0 border-gray-200 py-8 ">
          <p className="text-center text-gray-500 mb-4 md:mb-6">
            {locale === "en"
              ? "GET LATEST MINIMALISM NEWS"
              : "احصل على آخر أخبار البساطة"}
          </p>
          <h2 className="text-4xl font-bold text-center mb-6 md:mb-12">
            {locale === "en"
              ? "Newsletter Subscribe"
              : "اشترك في النشرة الإخبارية"}
          </h2>
          <p className="text-center text-gray-500 mb-8 md:mb-10">
            {locale === "en"
              ? "It only takes a second to be the first to find out about our latest news and promotions..."
              : "لا يستغرق الأمر سوى ثانية واحدة لتكون أول من يعرف بأحدث أخبارنا وعروضنا الترويجية."}
          </p>
          <form className="flex  justify-center">
            <input
              type="email"
              placeholder={
                locale === "en" ? "Your email address" : "بريدك الإلكتروني"
              }
              className="px-4 py-2 w-full   mr-4  focus:outline-none  border-b border-[#189CD9]"
            />
            <button
              type="submit"
              className="bg-[#189CD9] text-white px-4  hover:bg-[#189CD9] hover:text-black transition duration-300 w-40"
            >
              {locale === "en" ? "SIGN UP" : "اشترك"}
            </button>
          </form>
        </div>

        {/* Right Section: Follow Us */}
        <div className="w-full md:w-1/2  md:pl-16">
          <p className="text-center text-gray-500 mb-4 md:mb-6">
            {locale === "en" ? "READ OUR NEWS" : "قراءة أخبارنا"}
          </p>
          <h2 className="text-4xl font-bold text-center mb-6 md:mb-12">
            {locale === "en" ? "Follow Us" : "تابعنا"}
          </h2>
          <p className="text-center text-gray-500 mb-8 md:mb-10">
            {locale === "en"
              ? "It only takes a second to be the first to find out about our news and promotions..."
              : "لا يستغرق الأمر سوى ثانية واحدة لتكون أول من يعرف بأحدث أخبارنا وعروضنا الترويجية."}
          </p>
          <div className="flex justify-center space-x-4">
            {/* Social Media Icons */}

            {/* facebook */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#189CD9] transition duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>

            {/* x */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#189CD9] transition duration-300"
            >
              <TwitterIcon className="h-6 w-6" />
            </a>

            {/* instagram */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#189CD9] transition duration-300"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>

            {/* youtube */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#189CD9] transition duration-300"
            >
              <YoutubeIcon className="h-6 w-6" />
            </a>

            {/* linkedin */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#189CD9] transition duration-300"
            >
              <LucideLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
