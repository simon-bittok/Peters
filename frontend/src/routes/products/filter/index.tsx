import { createFileRoute } from "@tanstack/react-router";
import { MobileFilter } from "@/components/products/mobile-filter";

export const Route = createFileRoute("/products/filter/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<MobileFilter />
		</div>
	);
}
