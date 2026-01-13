"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { ProductDetailsResponse, ProductsResponse } from "@/types/api/products";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await axiosInstance<ProductsResponse>({
        url: `/products/`,
        method: "GET",
      }),
  });
};

export const useGetProductNSearch = ({ search = "", category = "" }) => {
  return useQuery({
    queryKey: ["products", search, category],
    queryFn: async () =>
      await axiosInstance<ProductsResponse>({
        url: `/products/?search=${search}&category=${category}`,
        method: "GET",
      }),
  });
};

// product details
export const useGetProductDetails = (id: string) => {
  const queryClient = useQueryClient();
  //   const { data: session } = useSession();

  return useQuery({
    queryKey: ["product", id],
    queryFn: async () =>
      await axiosInstance<ProductDetailsResponse>({
        url: `/products/${id}/`,
        method: "GET",
      }),
  });
};

// use categories
export const useGetCategories = <T,>() => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await axiosInstance<CategoresResponse>({
        url: `/categories/`,
        method: "GET",
      }),
  });
};
