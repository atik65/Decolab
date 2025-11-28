import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// construct image URL from given path
export function constructImageURL(path: string) {
  const BASE_URL = "https://services.onedirectionkw.com";
  if (path.startsWith("/")) {
    return `${BASE_URL}${path}`;
  } else {
    return `${BASE_URL}/${path}`;
  }
}
