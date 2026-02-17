import { useState } from "react";

const productImages: {
	image: string;
	alt: string;
	selected?: boolean;
}[] = [
	{
		image: "/products/details/iphone-14-pro-front-back-view-mobile.png",
		alt: "Front & Back view of iphone 14",
		selected: true,
	},
	{
		image: "/products/details/iphone-14-pro-front-view-mobile.png",
		alt: "Front view of iphone 14",
		selected: false,
	},
	{
		image: "/products/details/iphone-14-pro-back-view-mobile.png",
		alt: "Back view of iphone 14",
		selected: false,
	},
	{
		image: "/products/details/iphone-14-pro-side-view-mobile.png",
		alt: "Side view of iphone 14",
		selected: false,
	},
];

export function ProductThumbnail() {
	const [selectedImage, setSelectedImage] = useState({
		alt: "Front and back view of iPhone 14",
		image: "/products/details/selected-image-mobile.png",
	});

	return (
		<section className="flex flex-col gap-7.5">
			{/* Selected image */}
			<div className="flex items-center justify-center">
				<img
					src={selectedImage.image}
					alt={selectedImage.alt}
					width={"264px"}
					height={"330px"}
					className="object-center object-contain"
				/>
			</div>

			<div className="flex items-center justify-center gap-3.5">
				{productImages.map((item) => (
					<button
						key={item.image}
						type="button"
						className="max-w-[74.26px] flex items-center justify-center max-h-[66.34px]"
					>
						<img
							src={item.image}
							alt={item.alt}
							width={"74.26px"}
							height={"66.34px"}
							className="object-contain object-center"
						/>
					</button>
				))}
			</div>
		</section>
	);
}
