import { Portfolio } from "@prisma/client";
import { api } from "./api";
import { PortfolioData } from "../../features/portfolio/portfolioSlice";

interface AddPortfolioArgs {
  wedding: string;
  formData: FormData;
}

export const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPortfolio: builder.query<PortfolioData, void>({
      query: () => ({
        url: "/portfolio",
        method: "GET",
      }),
    }),
    getForIdPortfolio: builder.query<Portfolio[], string>({
      query: (wedding) => ({
        url: `/portfolio/${wedding}`,
        method: "GET",
      }),
    }),
    getWeddingPreview: builder.query<Portfolio[], string>({
      query: (wedding) => ({
        url: `/portfolio/preview/${wedding}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation<Portfolio, AddPortfolioArgs>({
      query: ({ wedding, formData }) => ({
        url: `/portfolio/add/${wedding}`,
        method: "POST",
        body: formData,
      }),
    }),
    delPortfolio: builder.mutation<void, string>({
      query: (id) => ({
        url: `/portfolio/del/${id}`,
        method: "DELETE",
      }),
    }),
    updatePreviewPortfolio: builder.mutation<
      Portfolio,
      { id: string; selectedId: string[] }
    >({
      query: ({ id, selectedId }) => ({
        url: "/portfolio/preview/update",
        method: "PUT",
        body: { id, selectedId },
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
  useDelPortfolioMutation,
} = portfolioApi;
