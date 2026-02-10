import React from "react";
import { OutlineButton } from "@/components/buttons";
import { cn } from "@/lib/utils";

interface MobileProps {
	titleProps: { regular: string; bold: string; className?: string };
	subtitle: string;
	image: string;
	alt: string;
	subtitleClass?: string;
	className?: string;
	cta?: boolean;
	imageWidth: string;
	imageHeight: string;
}

const mobileBanners: MobileProps[] = [
	{
		image: "/banners/apple-airpods-banner-mobile.png",
		alt: "Apple Airpods white",
		titleProps: { regular: "Apple Airpods", bold: "Max" },
		subtitle: "Computational audio. Listen, it's powerful",
		imageWidth: "192px",
		imageHeight: "200px",
		className: "bg-[#EDEDED]",
	},
	{
		image: "/banners/apple-vision-banner-mobile.png",
		alt: "Apple Vision Pro black",
		titleProps: {
			regular: "Apple Vision",
			bold: "Pro",
			className: "text-[#FFFFFF]",
		},
		subtitle: "An immersive way to experience entertainment",
		imageWidth: "325.87px",
		imageHeight: "192.44px",
		className: "bg-[#353535]",
	},
	{
		image: "/banners/sony-playstation-5-banner-mobile.png",
		alt: "Playstation 5 black and white",
		titleProps: {
			regular: "Playstation",
			bold: "5",
		},
		subtitle:
			"Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
		imageWidth: "200px",
		imageHeight: "200px",
		className: "bg-[#FFFFFF]",
	},
	{
		image: "/banners/apple-macbook-banner-mobile.png",
		alt: "Apple Macbook air",
		titleProps: {
			regular: "Macbook",
			bold: "Air",
		},
		subtitle:
			"The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
		imageWidth: "330.48px",
		imageHeight: "200px",
		className: "bg-[#EDEDED]",
		cta: true,
	},
];

function BannerTitle({
	regular,
	bold,
	className,
}: {
	regular: string;
	bold: string;
	className?: string;
}) {
	return (
		<h3 className={cn("leading-10 text-[34px] text-black", className)}>
			<span className="font-thin">{regular.trim()}&nbsp;</span>
			<span className="font-semibold">{bold}</span>
		</h3>
	);
}

function BannerSubtitle({
	subtitle,
	className,
}: {
	subtitle: string;
	className?: string;
}) {
	return (
		<p
			className={cn(
				"font-medium text-base leading-6 text-[#909090] line-clamp-2 text-center",
				className,
			)}
		>
			{subtitle}
		</p>
	);
}

export function SmallBannerMobile({
	titleProps,
	subtitle,
	image,
	alt,
	imageHeight,
	imageWidth,
	className,
	subtitleClass,
	cta,
}: MobileProps) {
	return (
		<section
			className={cn(
				"px-4 py-10 overflow-hidden space-y-6 flex flex-col items-center justify-center",
				className,
			)}
		>
			<div>
				<img
					src={image}
					alt={alt}
					width={imageWidth}
					height={imageHeight}
					className="object-center object-contain"
				/>
			</div>

			{cta !== undefined && cta !== false ? (
				<div className="flex flex-col items-center justify-center space-y-4">
					<div className="flex flex-col items-center justify-center space-y-2">
						<BannerTitle {...titleProps} />
						<BannerSubtitle subtitle={subtitle} className={subtitleClass} />
					</div>

					<OutlineButton className="border-black/60 text-black hover:bg-black/80 hover:text-white w-full">
						<span className="font-medium leading-6">Shop Now</span>
					</OutlineButton>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center space-y-2">
					<BannerTitle {...titleProps} />
					<p
						className={cn(
							"font-medium text-base leading-6 text-[#909090] line-clamp-2 text-center",
							subtitleClass,
						)}
					>
						{subtitle}
					</p>
				</div>
			)}
		</section>
	);
}

export function RectangleBanner() {
	return <section className="overflow-hidden"></section>;
}

export default function SmallBanners() {
	return (
		<React.Fragment>
			<div className="md:hidden">
				{mobileBanners.map((banner) => (
					<SmallBannerMobile
						key={`idx-banner-${banner.subtitle}`}
						{...banner}
					/>
				))}
			</div>
		</React.Fragment>
	);
}
