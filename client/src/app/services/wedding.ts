import { Wedding } from "@prisma/client";
import { api } from "./api";
import { WeddingData } from "../../features/wedding/weddingSlice";

export interface WeddingAdd {
  success: boolean;
  message: string;
  wedding: Wedding | null ;
}

const base_url = "/wedding/";

export const weddingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWeddings: builder.query<WeddingData, void>({
      query: () => ({
        url: base_url,
        method: "GET",
      }),
    }),
    getWedding: builder.query<
      {
        success: boolean;
        message: string;
        wedding: Wedding | null;
      },
      string
    >({
      query: (id) => ({
        url: `${base_url}${id}`,
        method: "GET",
      }),
    }),
    addWedding: builder.mutation<WeddingAdd, {id: string, name: string}>({
      query: () => ({
        url: `${base_url}add`,
        method: "POST",
      }),
    }),
    editWedding: builder.mutation<WeddingAdd, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `${base_url}edit/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),
    delWedding: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `${base_url}del/${id}`,
          method: "DELETE",
          body: { id },
        }),
      }
    ),
  }),
});

export const {
  useGetAllWeddingsQuery,
  useGetWeddingQuery,
  useAddWeddingMutation,
  useDelWeddingMutation,
  useEditWeddingMutation,
} = weddingApi;
