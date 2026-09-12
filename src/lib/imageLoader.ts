import { ImageLoaderProps } from "next/image";

export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  // If it's a relative URL (local asset), just return it as is.
  if (src.startsWith("/")) {
    return src;
  }

  // For remote URLs like Unsplash, just return the URL directly
  // In a production app with a CDN (like Cloudinary or AWS Image Optimizer),
  // you would append the width and quality parameters here.
  return src;
}
