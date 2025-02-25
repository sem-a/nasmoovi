import { Wedding } from "@prisma/client";
import { api } from "./api";
import { WeddingData } from "../../features/wedding/weddingSlice";

type getInfoWeddingProps = {
  name: string;
};

const base_url = "/wedding/";

export const weddingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWeddings: builder.query<WeddingData, void>({
      query: () => ({
        url: base_url,
        method: "GET",
      }),
    }),
    getWedding: builder.query<WeddingData, string>({
      query: (id) => ({
        url: `${base_url}${id}`,
        method: "GET",
      }),
    }),
    addWedding: builder.mutation<WeddingData, { name: string }>({
      query: ({ name }) => ({
        url: `${base_url}add`,
        method: "POST",
        body: { name },
      }),
    }),
    editWedding: builder.mutation<WeddingData, { id: string; name: string }>({
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
