import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { listenerMiddleware } from "../middleware/auth";
import auth from "../features/auth/authSlice";
import portfolio from "../features/portfolio/portfolioSlice";
import weddings from "../features/wedding/weddingSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    portfolio,
    weddings,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
