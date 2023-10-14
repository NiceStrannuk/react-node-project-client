import { Login, Home } from "./pages"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "login",
		element: <Login />
	},
])

function App() {

	return (
		<div className="font-manrope min-h-screen w-full">
			<RouterProvider router={router} />
		</div>
	)
}

export default App

