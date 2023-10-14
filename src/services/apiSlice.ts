import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IPostUser, IGetUser } from "../models"

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000", credentials: 'include' }),
	endpoints: (build) => ({
		createNewUser: build.mutation<IPostUser, IPostUser>({
			query: (user) => ({
				url: "/user/registration",
				method: "POST",
				body: user
			})
		}),
		loginUser: build.mutation<string, IPostUser>({
			query: (user) => ({
				url: "/user/login",
				method: "POST",
				body: user
			})
		}),
		getUserById: build.query<IGetUser, string>({
			query: (id: string) => ({
				url: `/user/${id}`,
				method: "GET",
			})
		}),
	})
}) 