import { Card, Flex, Stack, Text } from '@sanity/ui';
import { set } from 'sanity';
import type { ObjectInputProps } from 'sanity';

const LINK_TYPES = [
  { value: 'internal', label: 'Lien interne' },
  { value: 'external', label: 'Lien externe' },
] as const;

export function CtaInput(props: ObjectInputProps) {
  const { onChange, value } = props;

  const linkType = (value as Record<string, string> | undefined)?.linkType ?? 'internal';

  return (
    <Stack space={4}>
      {/* Toggle interne / externe */}
      <Stack space={2}>
        <Text size={1} weight="semibold" muted>
          Type de lien
        </Text>
        <Flex gap={2}>
          {LINK_TYPES.map((type) => {
            const selected = linkType === type.value;
            return (
              <Card
                key={type.value}
                as="button"
                type="button"
                padding={3}
                radius={2}
                tone={selected ? 'primary' : 'default'}
                shadow={selected ? 1 : 0}
                onClick={() => onChange(set(type.value, ['linkType']))}
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <Text size={1} weight={selected ? 'semibold' : 'regular'} align="center">
                  {type.label}
                </Text>
              </Card>
            );
          })}
        </Flex>
      </Stack>

      {/* Champs rendus par Sanity (label + internalPath ou externalUrl) */}
      {props.renderDefault(props)}
    </Stack>
  );
}
