import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="bg-white xl:px-40 lg:px-16 md:px-8 px-6">
			<h1>Home Page</h1>
		</div>
	);
}
