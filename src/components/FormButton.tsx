import { FC } from 'react'
import { styles } from "../constants/styles.ts"

interface FormButtonInterfave {
	text: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	classes?: string
}

const FormButton: FC<FormButtonInterfave> = ({ text, onClick, classes }) => {
	return (
		<button
			type='submit'
			className={`${styles.onclick} py-[11px] text-center text-[16px] leading-6 font-semibold text-main-white bg-main-blue rounded-[10px] ${classes}`}
			onClick={(e) => onClick(e)}
		>
			{text}
		</button>
	)
}

export default FormButton