import { Wedding } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { weddingApi } from "../../app/services/wedding";
import { RootState } from "../../app/store";

export interface WeddingData {
  success: boolean;
  message: string;
  wedding: Wedding[] | null ;
}

interface InitialState {
  wedding: WeddingData | null;
}

const initialState: InitialState = {
  wedding: null,
};

const slice = createSlice({
  name: "weddings",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      weddingApi.endpoints.getAllWeddings.matchFulfilled,
      (state, action) => {
        state.wedding = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectWeddings = (state: RootState) => state.weddings;
