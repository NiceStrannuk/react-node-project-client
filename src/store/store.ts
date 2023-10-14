import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import { userApi } from "../services/apiSlice";

export const store = configureStore({
	reducer: {
		main: mainSlice,
		[userApi.reducerPath]: userApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
})

store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem("user", JSON.stringify(state.main.user))
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;