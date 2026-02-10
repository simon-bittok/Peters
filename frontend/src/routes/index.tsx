import { createFileRoute } from "@tanstack/react-router";
import LargeBanner from "@/components/banners/large-banner";
import SmallBanners from "@/components/banners/small-banners";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="bg-white">
			<LargeBanner />
			<SmallBanners />
		</div>
	);
}
