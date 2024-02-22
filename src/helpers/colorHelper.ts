import { Color } from "@/models/enums";

export interface TailwindColor {
	bgColor: string;
	textColor: string;
	borderColor: string;
}

/**
 * Function that takes a color enum value and delivers all corresponding tailwind colors
 * @param color
 * @returns
 */
export function getColorFromEnum(color: Color): TailwindColor {
	switch (color) {
		case Color.Accent:
			return {
				bgColor: "bg-accent",
				textColor: "text-accent",
				borderColor: "border-accent",
			};
		case Color.Neutral:
			return {
				bgColor: "bg-neutral-500",
				textColor: "text-neutral-500",
				borderColor: "border-neutral-500",
			};
		case Color.Red:
			return {
				bgColor: "bg-red-500",
				textColor: "text-red-500",
				borderColor: "border-red-500",
			};
		case Color.Blue:
			return {
				bgColor: "bg-sky-500",
				textColor: "text-sky-500",
				borderColor: "border-sky-500",
			};
		case Color.Error:
			return {
				bgColor: "bg-error",
				textColor: "text-error",
				borderColor: "border-error",
			};
		case Color.Warn:
			return {
				bgColor: "bg-warning",
				textColor: "text-warning",
				borderColor: "border-warning",
			};
		case Color.Primary:
		default:
			return {
				bgColor: "bg-primary",
				textColor: "text-primary",
				borderColor: "border-primary",
			};
	}
}
