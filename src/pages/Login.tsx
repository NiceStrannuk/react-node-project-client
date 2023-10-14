import { Form } from "../components"
import { styles } from "../constants/styles";
import { useAppSelector } from "../hooks/redux";

const Login = () => {

	const { isUserLogining } = useAppSelector((state) => state.main);

	return (
		<div className='flex flex-row min-h-screen w-full bg-semi-black 2xl:flex 2xl:justify-center 2xl:items-center min-w-[320px] overflow-x-hidden'>
			<div className="container px-[18px] min-h-full w-full mx-auto py-[85px] flex justify-center items-center">
				<div className='flex items-center flex-col max-w-[439px] w-[439px]'>
					<div className="mb-[30px] text-center">
						<h1 className={`text-main-white ${styles.h1} font-bold`}>
							{!isUserLogining ? "Hi There" : "Welcome back"}
						</h1>
						<p className="text-base font-normal text-text-second">{!isUserLogining ? "Hi There!" : "Welcome back!"} Please enter your details.</p>
					</div>
					<Form />
				</div>
			</div>
		</div>
	)
}

export default Login