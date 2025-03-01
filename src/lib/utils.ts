import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ca-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
}
