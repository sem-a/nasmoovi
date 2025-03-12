import { Portfolio } from "@prisma/client";
import { api } from "./api";
import { PortfolioData } from "../../features/portfolio/portfolioSlice";

interface AddPortfolioArgs {
  wedding: string;
  formData: FormData;
}

interface ResponsePortfolio {
  success: boolean;
  message: string;
  portfolio: Portfolio;
}

export const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPortfolio: builder.query<PortfolioData, void>({
      query: () => ({
        url: "/portfolio",
        method: "GET",
      }),
    }),
    getForIdPortfolio: builder.query<PortfolioData, string>({
      query: (wedding) => ({
        url: `/portfolio/${wedding}`,
        method: "GET",
      }),
    }),
    getWeddingPreview: builder.query<PortfolioData, string>({
      query: (wedding) => ({
        url: `/portfolio/preview/${wedding}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation<ResponsePortfolio, AddPortfolioArgs>({
      query: ({ wedding, formData }) => ({
        url: `/portfolio/add/${wedding}`,
        method: "POST",
        body: formData,
      }),
    }),
    updatePreviewPortfolio: builder.mutation<
      ResponsePortfolio,
      { id: string; selectedIds: string[] }
    >({
      query: ({ id, selectedIds }) => ({
        url: `/portfolio/preview/update/${id}`,
        method: "PUT",
        body: { selectedIds },
      }),
    }),
  }),
});

export const {
  useAddPortfolioMutation,
  useGetAllPortfolioQuery,
  useGetForIdPortfolioQuery,
  useUpdatePreviewPortfolioMutation,
  useGetWeddingPreviewQuery,
} = portfolioApi;
