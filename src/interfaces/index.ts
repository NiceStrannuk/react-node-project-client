import { UseFormRegisterReturn } from "react-hook-form"

interface IInterlink {
	link: UseFormRegisterReturn
	title: "username" | "email" | "password" | "confirmPassword"
}

export interface IFormInputsFields {
	label: string,
	hookFormInterlink: IInterlink
	value: string,
	description: string
	isError: boolean
	placeholder: string
	condition?: boolean
}

export interface IForm {
	username: string,
	email: string,
	password: string,
	confirmPassword?: string
}