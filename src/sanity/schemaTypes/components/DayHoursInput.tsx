import { Box, Flex } from '@sanity/ui';
import { ObjectInputMember, ObjectInputProps } from 'sanity';
import { useMemo } from 'react';
import type { DayHoursValue } from '../shared/types';

export function DayHoursInput(props: ObjectInputProps<DayHoursValue>) {
  const { members, value } = props;

  const openMember = members.find((m) => m.kind === 'field' && m.name === 'open');
  const closeMember = members.find(
    (m) => m.kind === 'field' && m.name === 'close'
  );

  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  };

  // Créer un membre modifié pour close avec readOnly si open n'est pas défini
  const closeReadOnly = !value?.open;

  // Créer une version modifiée du closeMember avec des options dynamiques
  const modifiedCloseMember = useMemo(() => {
    if (!closeMember || closeMember.kind !== 'field') return closeMember;

    return {
      ...closeMember,
      field: {
        ...closeMember.field,
        schemaType: {
          ...closeMember.field.schemaType,
          readOnly: closeReadOnly,
          options: {
            ...closeMember.field.schemaType.options,
            minTime: value?.open || undefined,
          },
        },
      },
    };
  }, [closeMember, closeReadOnly, value?.open]);

  return (
    <Flex gap={3}>
      {openMember && (
        <Box flex={1}>
          <ObjectInputMember member={openMember} {...renderProps} />
        </Box>
      )}
      {modifiedCloseMember && (
        <Box flex={1}>
          <ObjectInputMember member={modifiedCloseMember} {...renderProps} />
        </Box>
      )}
    </Flex>
  );
}
