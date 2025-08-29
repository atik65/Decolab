"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { ProductsResponse } from "@/types/api/products";

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
