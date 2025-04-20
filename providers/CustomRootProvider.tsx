"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/shared/ScrollToTop";
import ContactSection from "@/app/_pages/home/ContactsSection";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import FloatingWP from "@/components/shared/FloatingWP";
// import ScrollToTopButton from "@/components/shared/ScrollToTop";
// import FloatingCart from "@/components/shared/FloatingCart";
// import useGetCartFromLS from "@/hooks/zustand/useGetCartFromLS";

const AppProgressProvider = dynamic(
  () => import("@bprogress/next").then((mod) => mod.AppProgressProvider),
  {
    ssr: true,
  }
);

const SnackbarProvider = dynamic(
  () => import("notistack").then((mod) => mod.SnackbarProvider),
  {
    ssr: true,
  }
);

// const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const CustomRootProvider = ({ children }: Props) => {
  //

  const [queryClient] = useState(() => new QueryClient());

  // get cart from localStorage and saving to zustand global state
  //   useGetCartFromLS();

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div className="bg-white text-black">
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          {/* <SessionProvider session={session}> */}
          <AppProgressProvider
            height="3px"
            color="#99b998"
            options={{ showSpinner: false }}
            shallowRouting
          >
            <Header />

            {children}

            <ContactSection />
            <Footer />
            {/* <Footer /> */}

            {/* <FloatingCart /> */}
            <FloatingWP />
            <ScrollToTopButton />
          </AppProgressProvider>
        </SnackbarProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
    // </Suspense>
  );
};

export default CustomRootProvider;
