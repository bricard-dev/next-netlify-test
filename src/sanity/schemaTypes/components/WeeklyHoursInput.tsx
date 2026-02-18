import { Box, Card, Flex, Stack, Switch, Text } from '@sanity/ui';
import { ObjectInputMember, ObjectInputProps, set } from 'sanity';
import { DEFAULT_OPENING_TIME, DEFAULT_CLOSING_TIME } from '../shared/constants';
import type { WeeklyHoursValue } from '../shared/types';

const DAYS = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
] as const;

export function WeeklyHoursInput(props: ObjectInputProps<WeeklyHoursValue>) {
  const { onChange, members, value } = props;

  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  };

  return (
    <Stack space={3}>
      {DAYS.map(({ key, label }) => {
        const dayMember = members.find(
          (m) => m.kind === 'field' && m.name === key
        );

        if (!dayMember || dayMember.kind !== 'field') return null;

        // Récupérer les membres du champ dayHours
        const dayValue = value?.[key];
        const isOpen = dayValue?.isOpen || false;

        const handleToggle = () => {
          if (!dayValue) {
            // Si le jour n'existe pas encore, créer l'objet complet avec heures par défaut
            onChange(
              set(
                {
                  _type: 'dayHours',
                  isOpen: true,
                  open: DEFAULT_OPENING_TIME,
                  close: DEFAULT_CLOSING_TIME,
                },
                [key]
              )
            );
          } else {
            // Si on ouvre le jour et qu'il n'a pas d'heures, ajouter les valeurs par défaut
            if (!isOpen && (!dayValue.open || !dayValue.close)) {
              onChange(
                set(
                  {
                    ...dayValue,
                    isOpen: true,
                    open: dayValue.open || DEFAULT_OPENING_TIME,
                    close: dayValue.close || DEFAULT_CLOSING_TIME,
                  },
                  [key]
                )
              );
            } else {
              // Sinon, juste mettre à jour isOpen
              onChange(set(!isOpen, [key, 'isOpen']));
            }
          }
        };

        return (
          <Card key={key} padding={3} radius={2} shadow={1}>
            <Stack space={3}>
              {/* En-tête avec nom du jour et switch */}
              <Flex align="center" justify="space-between">
                <Text size={1}>{label}</Text>
                <Flex align="center" gap={2}>
                  <Switch checked={isOpen} onChange={handleToggle} />
                  <Text muted size={1}>
                    {isOpen ? 'Ouvert' : 'Fermé'}
                  </Text>
                </Flex>
              </Flex>

              {/* Heures (affichées seulement si ouvert) */}
              {isOpen && (
                <Box>
                  <ObjectInputMember
                    member={dayMember}
                    {...renderProps}
                    renderField={(fieldProps) => fieldProps.children}
                  />
                </Box>
              )}
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
