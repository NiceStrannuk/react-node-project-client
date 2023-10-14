import { FC, useEffect } from "react"
import { IFormInputsFields } from "../interfaces"

interface IFormInputsProps {
	data: IFormInputsFields,
	onChange: (newValue: string) => void
}

const FormInput: FC<IFormInputsProps> = ({ data, onChange }) => {

	useEffect(() => {
		onChange("")
	}, [])

	return (
		<div className="flex gap-[5px] flex-col mt-[10px]">
			<div className="text-sm leading-[22px] font-medium text-main-white">{data.label}</div>
			<input
				placeholder={data.placeholder}
				type="text"
				value={data.value}
				{...data.hookFormInterlink.link}
				onChange={(e) => onChange(e.target.value)}
				className="px-3 py-[11px] outline-none bg-transparent border border-border-black rounded-[10px] text-main-white placeholder-text-second"
			/>
			{data.description && data.isError && <div className={`text-sm leading-[22px] font-medium text-red-800`}>{data.description}</div>}
		</div>
	)
}

export default FormInput;