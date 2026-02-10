import { HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
	name: string;
	image: string;
	alt: string;
	price: number;
	isWishlisted: boolean;
}

export function ProductCard({ isWishlisted, image, alt, name, price }: Props) {
	return (
		<div className="space-y-2 md:space-y-4 py-6 px-3 md:px-4 bg-[#F6F6F6F] rounded-[9px]">
			{/* Top section */}
			<div className="w-full flex items-center justify-end p-0 gap-2">
				<HeartIcon
					className={`size-6 ${isWishlisted ? "fill-[#FF0000] text-[#FF0000]" : "text-[#909090]"}`}
				/>
			</div>
			{/* Mid section */}
			<div className="flex items-center justify-center">
				<img
					src={image}
					alt={alt}
					width={"104px md:160px"}
					height={"104px md:160px"}
					className="object-center object-contain"
				/>
			</div>
			{/* Bottom section: Name, price & Button */}
			<div className="flex flex-col gap-4 md:gap-6 justify-between">
				<div className="space-y-4">
					<p className="font-medium text-base leading-6 text-black line-clamp-2">
						{name}
					</p>
					<p className="font-semibold leading-6 tracking-[0.03em] text-2xl">
						{price}
					</p>
				</div>

				<Button
					variant={"default"}
					className="rounded-xl px-16 py-3 h-12 group  "
				>
					<span className="text-sm leading-6 font-medium">Add to Cart</span>
				</Button>
			</div>
		</div>
	);
}
