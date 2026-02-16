import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
			{/* Filters */}
			<MobileFilterButtons onFilterClick={() => setIsFilterOpen(true)} />
			{isFilterOpen && (
				<div className="fixed inset-0 bg-white z-50 overflow-y-auto transition-transform duration-300 ease-in-out">
					<MobileFilter onClose={() => setIsFilterOpen(false)} />
				</div>
			)}
			{/* Product Grid */}
			<main className="pb-10">
				<ProductGrid />
			</main>
		</div>
	);
}
