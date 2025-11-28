"use client";
import React from "react";
import { motion } from "framer-motion";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const locale = useGetLocale();

  const content = {
    en: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you",
      phone: {
        label: "Phone",
        value: "+965 6705 9197",
        link: "tel:+96567059197",
      },
      whatsapp: {
        label: "WhatsApp",
        value: "+965 6705 9197",
        link: "https://api.whatsapp.com/send?phone=96567059197",
      },
      email: {
        label: "Email",
        value: "info@onedirection.com",
        link: "mailto:info@onedirection.com",
      },
      location: {
        label: "Location",
        value: "Kuwait",
      },
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "يسعدنا سماع رأيك",
      phone: {
        label: "الهاتف",
        value: "+965 6705 9197",
        link: "tel:+96567059197",
      },
      whatsapp: {
        label: "واتساب",
        value: "+965 6705 9197",
        link: "https://api.whatsapp.com/send?phone=96567059197",
      },
      email: {
        label: "البريد الإلكتروني",
        value: "info@onedirection.com",
        link: "mailto:info@onedirection.com",
      },
      location: {
        label: "الموقع",
        value: "الكويت",
      },
    },
  };

  const currentContent = content[locale];

  return (
    <div className="min-h-[70vh] bg-white">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Header */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {currentContent.title}
            </h1>
            <div className="w-16 h-1 bg-[#99b998] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-gray-600 mb-12">
              {currentContent.subtitle}
            </p>

            {/* Contact Cards */}
            <div className="grid gap-6 md:gap-8">
              {/* Phone */}
              <motion.a
                href={currentContent.phone.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-[#99b998]/10 transition-all duration-300 border-2 border-gray-100 hover:border-[#99b998]"
              >
                <div className="w-12 h-12 bg-[#99b998]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#99b998]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">
                    {currentContent.phone.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {currentContent.phone.value}
                  </p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={currentContent.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-[#99b998]/10 transition-all duration-300 border-2 border-gray-100 hover:border-[#99b998]"
              >
                <div className="w-12 h-12 bg-[#99b998]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#99b998]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">
                    {currentContent.whatsapp.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {currentContent.whatsapp.value}
                  </p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={currentContent.email.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-[#99b998]/10 transition-all duration-300 border-2 border-gray-100 hover:border-[#99b998]"
              >
                <div className="w-12 h-12 bg-[#99b998]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#99b998]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">
                    {currentContent.email.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {currentContent.email.value}
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-gray-100"
              >
                <div className="w-12 h-12 bg-[#99b998]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#99b998]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">
                    {currentContent.location.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {currentContent.location.value}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
