import { Image } from "expo-image";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import { SearchResult } from "@/types/SearchResult";

type SearchResultCardProps = {
  searchResult: SearchResult;
};

export default function SearchResultCard({
  searchResult,
}: SearchResultCardProps) {
  return (
    <Box
      flexDirection="row"
      gap="s"
      paddingVertical="s"
      paddingHorizontal="m"
      backgroundColor="surfaceContainer"
    >
      <Avatar size="m" source={searchResult.image} />
      <Box gap="xs">
        <Text variant="body" color="onSurface">
          {searchResult.name}
        </Text>
        <Text variant="label" color="onSurface">
          {searchResult.type}
        </Text>
      </Box>
    </Box>
  );
}
