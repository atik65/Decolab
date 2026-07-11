"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/shared/ScrollToTop";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import FloatingWP from "@/components/shared/FloatingWP";
import ContactSection from "@/app/_pages/home/ContactsSection";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const AppProgressProvider = dynamic(
  () => import("@bprogress/next").then((mod) => mod.AppProgressProvider),
  {
    ssr: true,
  },
);

const SnackbarProvider = dynamic(
  () => import("notistack").then((mod) => mod.SnackbarProvider),
  {
    ssr: true,
  },
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
        <NuqsAdapter>
          <SnackbarProvider>
            {/* <SessionProvider session={session}> */}
            <AppProgressProvider
              height="3px"
              color="var(--brand-primary)"
              options={{ showSpinner: false }}
              shallowRouting
            >
              <Header />

              {children}
              {/* <ContactSection /> */}
              <Footer />
              {/* <Footer /> */}
              {/* <FloatingCart /> */}
              <FloatingWP />
              <ScrollToTopButton />
            </AppProgressProvider>
          </SnackbarProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </NuqsAdapter>
      </QueryClientProvider>
    </div>
    // </Suspense>
  );
};

export default CustomRootProvider;
