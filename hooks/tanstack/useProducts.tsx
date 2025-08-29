"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { ProductDetailsResponse, ProductsResponse } from "@/types/api/products";

export const useGetProducts = () => {
  const queryClient = useQueryClient();
  //   const { data: session } = useSession();

  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await axiosInstance<ProductsResponse>({
        url: `/products/`,
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
