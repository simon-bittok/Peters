import { createFileRoute } from "@tanstack/react-router";
import { ProductDetails } from "@/components/product-details";
import { ProductDetailBreadcrumb } from "@/components/product-details/breadcrumbs";
import { ProductThumbnail } from "@/components/product-details/images";
import { ProductInfo } from "@/components/product-details/info";
import { RelatedProducts } from "@/components/product-details/related-products";

export const Route = createFileRoute("/products/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return (
		<section className="py-8 space-y-9 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
			<div className="hidden lg:block">
				<ProductDetailBreadcrumb />
			</div>
			<main className="flex flex-col gap-9 lg:gap-0">
				<section className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 xl:py-8">
					<ProductThumbnail />
					<ProductInfo />
				</section>
				<ProductDetails />

				{/* TODO: Create reviews component */}

				<RelatedProducts />
			</main>
		</section>
	);
}
