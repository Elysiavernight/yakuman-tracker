import type { Area } from "react-easy-crop";

export async function cropAvatar(
  source: string,
  area: Area,
  rotation: number,
): Promise<string> {
  const image = new Image();
  image.src = source;
  await image.decode();
  if (area.width <= 0 || area.height <= 0) {
    throw new Error("Choose a crop area before applying the photo.");
  }

  const angle = (rotation * Math.PI) / 180;
  const rotatedWidth =
    Math.abs(image.naturalWidth * Math.cos(angle)) +
    Math.abs(image.naturalHeight * Math.sin(angle));
  const rotatedHeight =
    Math.abs(image.naturalWidth * Math.sin(angle)) +
    Math.abs(image.naturalHeight * Math.cos(angle));
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not crop this photo.");

  // Crop coordinates refer to the rotated image's bounding box. Transform
  // directly onto the output canvas rather than allocating a full-size copy.
  context.imageSmoothingQuality = "high";
  context.scale(canvas.width / area.width, canvas.height / area.height);
  context.translate(-area.x, -area.y);
  context.translate(rotatedWidth / 2, rotatedHeight / 2);
  context.rotate(angle);
  context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
  return canvas.toDataURL("image/png");
}
