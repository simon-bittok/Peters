import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageBreadcrumb from "@/components/products/breadcrumbs";
import ProductFilters from "@/components/products/filters";
import ProductGrid from "@/components/products/grid";
import {
	MobileFilter,
	MobileFilterButtons,
} from "@/components/products/mobile-filter";

export const Route = createFileRoute("/products/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	return (
		<div className="bg-white space-y-11.25 overflow-hidden border-t border-black/40">
			{/* Mobile Filters */}
			<MobileFilterButtons onFilterClick={() => setIsFilterOpen(true)} />
			{isFilterOpen && (
				<div className="fixed inset-0 bg-white z-50 overflow-y-auto transition-transform duration-300 ease-in-out">
					<MobileFilter onClose={() => setIsFilterOpen(false)} />
				</div>
			)}

			<div className="hidden lg:block">
				<PageBreadcrumb />
			</div>

			{/* Product Grid */}
			<main className="pb-10 px-4 xl:px-40 mx-auto md:px-6 lg:px-16 md:pt-6 md:pb-14 flex items-start md:gap-6 xl:gap-8">
				<div className="hidden lg:block md:w-60 lg:w-[256px]">
					<ProductFilters />
				</div>
				<ProductGrid />
			</main>
		</div>
	);
}
