import { FormButton, FormInput } from "."
import { changeFormType, setUser } from "../store/mainSlice"
import axios, { AxiosResponse } from "axios";
import { z, ZodType } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { IForm, IFormInputsFields } from "../interfaces";
import { validationRules } from "../constants";
import { userApi } from "../services/apiSlice";
import { IGetUser, IPostUser } from "../models";
import { useNavigate } from 'react-router-dom';
// import { formSchema } from "../schemas";

const Form = () => {

	const { isUserLogining } = useAppSelector((state) => state.main);
	const dispatch = useAppDispatch();
	const [createNewUser] = userApi.useCreateNewUserMutation();
	const [loginUser] = userApi.useLoginUserMutation();
	const navigate = useNavigate();

	const formSchema: ZodType<IForm> = z.object({
		username: z.string().min(6).max(30),
		email: z.string().email(),
		password: z.string().min(6).max(30),
		confirmPassword: isUserLogining ? z.string().optional() : z.string().min(6).max(30),
	}).refine((data) => {
		if (!isUserLogining) {
			return data.password === data.confirmPassword;
		}
		return true;
	}, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

	const { register, handleSubmit, formState: { errors } } = useForm<IForm>({ resolver: zodResolver(formSchema) });

	const [formFields, setFormFields] = useState<IFormInputsFields[]>([
		{ label: "Username", hookFormInterlink: { link: { ...register("username") }, title: "username" }, value: "", description: "", isError: false, placeholder: "Enter Your Username" },
		{ label: "Email", hookFormInterlink: { link: { ...register("email") }, title: "email" }, value: "", description: "", isError: false, placeholder: "Enter Your Email" },
		{ label: "Password", hookFormInterlink: { link: { ...register("password") }, title: "password" }, value: "", description: "", isError: false, placeholder: "Enter Your Password" },
		{ label: "Confirm Password", hookFormInterlink: { link: { ...register("confirmPassword") }, title: "confirmPassword" }, value: "", description: "", isError: false, placeholder: "Confirm Password", condition: isUserLogining },
	])

	const handleChange = (index: number, newValue: string): void => setFormFields((prevFormFields) => prevFormFields.map((data, i) => i === index ? { ...data, value: newValue } : data))

	const refreshInputsValue = (): void => {
		setFormFields(formFields.map((data) => {
			data.value = "";
			data.isError = false;
			data.description = "";
			return { ...data };
		}));
	};

	const loginSubmit: SubmitHandler<IForm> = async (data) => {
		const userData: IPostUser = {
			username: data.username,
			email: data.email,
			password: data.password
		}
		try {
			const response = await loginUser(userData).unwrap();
			const user: AxiosResponse<IGetUser> = await axios.get(`http://localhost:5000/user/${response}`, {
				withCredentials: true
			});
			delete user.data.password;
			delete user.data.__v;
			dispatch(setUser(user.data));
			navigate('/');
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	const registrationSubmit: SubmitHandler<IForm> = async (data) => {
		const userData: IPostUser = {
			username: data.username,
			email: data.email,
			password: data.password
		}
		try {
			const response = await createNewUser(userData).unwrap();
			if (response && response !== undefined && response !== null) {
				dispatch(changeFormType())
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	const onSubmit: SubmitHandler<IForm> = async (data) => {
		if (isUserLogining) {
			loginSubmit(data)
		} else {
			registrationSubmit(data)
		}
	}

	useEffect(() => {
		setFormFields(prevFields =>
			prevFields.map((field) => {
				const interlink = field.hookFormInterlink.title;
				let description = field.description;
				if (errors[interlink]?.message) {
					description = errors[interlink]?.message || "";
				} else {
					const validationRule = validationRules.find(rule => rule.name === interlink);
					if (validationRule) description = validationRule.description;
				}
				return { ...field, description };
			})
		);
	}, [errors])

	return (
		<form className="flex flex-col w-full max-w-[439px]" onSubmit={handleSubmit(onSubmit)}>
			{formFields.map((field, index) => field.condition !== isUserLogining && (
				<FormInput
					data={{ ...field, isError: !!errors[field.hookFormInterlink.title] }}
					key={`${field.label}-${index}`}
					onChange={(newValue) => handleChange(index, newValue)} />
			))}
			<FormButton
				text={isUserLogining ? `Sign in` : "Sign up"}
				onClick={() => { }}
				classes="mt-[12px]"
			/>
			<div className="text-center mt-[30px]">
				<p className="text-[14px] font-normal leading-normal text-text-second">Don’t have an account?
					<span
						className={` text-main-blue font-medium cursor-pointer hover:brightness-75 transition-all ml-1`}
						onClick={() => {
							dispatch(changeFormType())
							refreshInputsValue()
						}}
					>
						{!isUserLogining ? `Sign in` : "Sign up"}
					</span>
				</p>
			</div>
		</form>
	)
}

export default Form;