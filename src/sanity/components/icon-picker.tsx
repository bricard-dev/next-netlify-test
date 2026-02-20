import { set, unset } from 'sanity';
import type { StringInputProps } from 'sanity';
import { Box, Card, Flex, Grid, Text } from '@sanity/ui';
import {
  Award,
  Cake,
  CakeSlice,
  ChefHat,
  Clock,
  Heart,
  Leaf,
  Package,
  Sandwich,
  Star,
  Truck,
  Wheat,
} from 'lucide-react';

const ICONS = [
  { name: 'Wheat', Icon: Wheat },
  { name: 'ChefHat', Icon: ChefHat },
  { name: 'Heart', Icon: Heart },
  { name: 'Truck', Icon: Truck },
  { name: 'Clock', Icon: Clock },
  { name: 'Award', Icon: Award },
  { name: 'Leaf', Icon: Leaf },
  { name: 'Star', Icon: Star },
  { name: 'Package', Icon: Package },
  { name: 'Cake', Icon: Cake },
  { name: 'CakeSlice', Icon: CakeSlice },
  { name: 'Sandwich', Icon: Sandwich },
];

export function IconPicker({ value, onChange }: StringInputProps) {
  return (
    <Grid columns={6} gap={2}>
      {ICONS.map(({ name, Icon }) => {
        const selected = value === name;
        return (
          <Card
            key={name}
            as="button"
            type="button"
            padding={3}
            radius={2}
            tone={selected ? 'primary' : 'default'}
            shadow={selected ? 1 : 0}
            onClick={() => onChange(selected ? unset() : set(name))}
            style={{ cursor: 'pointer' }}
          >
            <Flex direction="column" align="center" gap={2}>
              <Box>
                <Icon size={20} />
              </Box>
              <Text size={0} muted={!selected} weight={selected ? 'semibold' : 'regular'}>
                {name}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Grid>
  );
}
