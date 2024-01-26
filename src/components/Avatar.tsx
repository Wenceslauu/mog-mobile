import { Image } from "expo-image";

enum AvatarSize {
  s = 50,
  m = 70,
  l = 100,
}

type AvatarProps = {
  source: any;
  size: "s" | "m" | "l";
};

export default function Avatar({ source, size }: AvatarProps) {
  const sizeInPixels = AvatarSize[size];

  return (
    <Image
      source={source}
      style={{
        borderRadius: sizeInPixels / 2,
        width: sizeInPixels,
        height: sizeInPixels,
      }}
    />
  );
}
