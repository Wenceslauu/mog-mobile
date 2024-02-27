import Box from "./Box";
import Text from "./Text";

type TableProps = {
  rows: { label: string; value: string }[];
};

export default function Table({ rows }: TableProps) {
  return (
    <Box>
      {rows.map((row, index) => (
        <Box
          key={index}
          flexDirection="row"
          borderBottomColor="outlineVariant"
          paddingVertical="s"
          borderBottomWidth={1}
        >
          <Box flex={1}>
            <Text variant="body" color="secondary">
              {row.label}
            </Text>
          </Box>
          <Box flex={1}>
            <Text variant="body" color="onSurface">
              {row.value}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
