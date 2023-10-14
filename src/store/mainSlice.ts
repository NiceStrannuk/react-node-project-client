import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGetUser } from "../models";

export interface MainState {
	isUserLogining: boolean
	user: IGetUser | null
}

let userItem = localStorage.getItem("user");
let user: IGetUser = userItem ? JSON.parse(userItem) : null;

const initialState: MainState = {
	isUserLogining: true,
	user: user,
}

export const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		changeFormType: (state) => {
			state.isUserLogining = !state.isUserLogining
		},
		setUser: (state, action: PayloadAction<IGetUser>) => {
			state.user = { ...action.payload }
		},
	}
})

export const { changeFormType, setUser } = mainSlice.actions;
export default mainSlice.reducer