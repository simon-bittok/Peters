import { createFileRoute } from "@tanstack/react-router";
import BigBanners from "@/components/banners/big-banners";
import LargeBanner from "@/components/banners/large-banner";
import SmallBanners from "@/components/banners/small-banners";
import BrowseByCategory from "@/components/browse-by-category";
import BrowseByProducts from "@/components/browse-by-products";
import DiscountedProducts from "@/components/discounts";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="bg-white">
			<LargeBanner />
			<SmallBanners />
			<BrowseByCategory />
			<BrowseByProducts />
			<BigBanners />
			<DiscountedProducts />
		</div>
	);
}
