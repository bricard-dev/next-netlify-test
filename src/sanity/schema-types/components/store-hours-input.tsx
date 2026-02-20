import { Box, Flex, Stack, Switch, Text } from "@sanity/ui";
import { useCallback } from "react";
import { ObjectInputMember, ObjectInputProps, set } from "sanity";

type StoreHoursValue = {
  _type?: "storeHours";
  day?: string;
  isOpen?: boolean;
  open?: string;
  close?: string;
};

export function StoreHoursInput(props: ObjectInputProps<StoreHoursValue>) {
  const { onChange, members, value } = props;

  const dayMember = members.find((m) => m.kind === "field" && m.name === "day");
  const openMember = members.find(
    (m) => m.kind === "field" && m.name === "open",
  );
  const closeMember = members.find(
    (m) => m.kind === "field" && m.name === "close",
  );

  const handleToggle = useCallback(() => {
    const newIsOpen = !value?.isOpen;
    onChange(set(newIsOpen, ["isOpen"]));
  }, [onChange, value?.isOpen]);

  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  };

  return (
    <Stack space={3}>
      <Flex direction={"column"} gap={4}>
        {/* Switch au milieu */}
        <Flex align="center" gap={2}>
          <Switch checked={value?.isOpen || false} onChange={handleToggle} />
          <Text muted size={1}>
            {value?.isOpen ? "Ouvert" : "Fermer"}
          </Text>
        </Flex>

        {/* Heures à droite (seulement si ouvert) */}
        {value?.isOpen && openMember && closeMember && (
          <Flex gap={2} flex={1} align="flex-end">
            <Box flex={1}>
              <ObjectInputMember member={openMember} {...renderProps} />
            </Box>
            <Box flex={1}>
              <ObjectInputMember member={closeMember} {...renderProps} />
            </Box>
          </Flex>
        )}
      </Flex>

      {/* Champ jour caché mais nécessaire pour le schéma */}
      {dayMember && (
        <Box style={{ display: "none" }}>
          <ObjectInputMember member={dayMember} {...renderProps} />
        </Box>
      )}
    </Stack>
  );
}
