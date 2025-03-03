import { Video } from "@prisma/client";
import { api } from "./api";

interface ResponseVideo {
  success: boolean;
  message: string;
  video: Video[];
}

export const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideo: builder.query<ResponseVideo, void>({
      query: () => ({
        url: "/video",
        method: "GET",
      }),
    }),
    addVideo: builder.mutation<
      { success: boolean; message: string; video: Video },
      FormData
    >({
      query: (formData) => ({
        url: `/video/add`,
        method: "POST",
        body: formData,
      }),
    }),
    delVideo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/video/del/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAddVideoMutation, useDelVideoMutation, useGetAllVideoQuery } =
  videoApi;
