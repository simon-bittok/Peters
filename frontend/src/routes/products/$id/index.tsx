import { createFileRoute } from "@tanstack/react-router";
import { ProductThumbnail } from "@/components/product-details/images";
import { ProductInfo } from "@/components/product-details/info";

export const Route = createFileRoute("/products/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return (
		<section className="py-8 space-y-9 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
			<ProductThumbnail />
			<ProductInfo />
		</section>
	);
}
