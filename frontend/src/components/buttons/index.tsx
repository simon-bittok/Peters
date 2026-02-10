import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const OutlineButton = ({
	className,
	children,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<Button
		variant="outline"
		className={cn(
			"bg-inherit px-14 py-4 h-14 gap-2 rounded-[6px] group hover:bg-white/80 border-[1.5px] border-white/60 text-white hover:text-black transition-transform duration-300",
			className,
		)}
	>
		{children}
	</Button>
);
