import { createFileRoute } from "@tanstack/react-router";
import LargeBanner from "@/components/banners/large-banner";
import SmallBanners from "@/components/banners/small-banners";
import BrowseByCategory from "@/components/browse-by-category";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="bg-white">
			<LargeBanner />
			<SmallBanners />
			<BrowseByCategory />
		</div>
	);
}
