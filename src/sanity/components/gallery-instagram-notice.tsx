import { WarningOutlineIcon } from "@sanity/icons";
import { Card, Flex, Stack, Text } from "@sanity/ui";
import type { ArrayOfObjectsInputProps } from "sanity";

export function GalleryInstagramNotice(props: ArrayOfObjectsInputProps) {
  return (
    <Stack space={4}>
      <Card padding={3} radius={2} tone="caution" shadow={1}>
        <Flex align="flex-start" gap={3}>
          <Text size={2}>
            <WarningOutlineIcon />
          </Text>
          <Text size={1}>
            Sans URL Instagram configurée, les images de la galerie ne seront
            pas cliquables. Configurez-la dans Site Settings → Social Media.
          </Text>
        </Flex>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
