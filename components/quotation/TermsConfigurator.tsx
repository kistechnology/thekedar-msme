"use client";

import { Paper, Title, Stack, Group, TextInput, Text, Divider } from "@mantine/core";
import { allTerms, type Term } from "@/lib/data/termsAndConditions";
import type { TermVariable } from "@/lib/data/termsAndConditions";

interface TermsConfiguratorProps {
  selectedTerms: string[];
  termsConfig: Record<string, Record<string, string | number>>;
  onConfigChange: (termId: string, variableKey: string, value: string | number) => void;
}

export default function TermsConfigurator({
  selectedTerms,
  termsConfig,
  onConfigChange,
}: TermsConfiguratorProps) {
  // Get all configurable terms that are selected
  const configurableTerms = selectedTerms
    .map((id) => allTerms.find((t) => t.id === id))
    .filter((term): term is Term => term !== undefined && term.configurable === true);

  if (configurableTerms.length === 0) {
    return null;
  }

  return (
    <Paper p="md" radius="md" withBorder>
      <Title order={4} mb="md">
        Configure Selected Terms
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        Customize values for the selected terms below
      </Text>

      <Stack gap="lg">
        {configurableTerms.map((term) => {
          if (!term.variables) return null;

          return (
            <div key={term.id}>
              <Text fw={600} size="sm" mb="xs" c="blue">
                {term.text.replace(/\{[^}]+\}/g, "...")}
              </Text>
              <Stack gap="xs" pl="md">
                {term.variables.map((variable) => {
                  const currentValue =
                    termsConfig[term.id]?.[variable.key] ?? variable.defaultValue;

                  return (
                    <Group key={variable.key} grow>
                      <TextInput
                        label={variable.label}
                        placeholder={`Enter ${variable.label.toLowerCase()}`}
                        value={String(currentValue)}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Parse based on type
                          let parsedValue: string | number = value;
                          if (variable.type === "percentage" || variable.type === "number" || variable.type === "days" || variable.type === "floor") {
                            parsedValue = value === "" ? variable.defaultValue : Number(value);
                            if (isNaN(parsedValue as number)) {
                              parsedValue = variable.defaultValue;
                            }
                          }
                          onConfigChange(term.id, variable.key, parsedValue);
                        }}
                        rightSection={
                          variable.unit ? (
                            <Text size="xs" c="dimmed" mr="xs">
                              {variable.unit}
                            </Text>
                          ) : null
                        }
                        type={variable.type === "text" ? "text" : "number"}
                        min={variable.type === "percentage" ? 0 : variable.type === "number" || variable.type === "days" || variable.type === "floor" ? 0 : undefined}
                        max={variable.type === "percentage" ? 100 : undefined}
                        style={{ flex: 1 }}
                        size="sm"
                      />
                    </Group>
                  );
                })}
              </Stack>
              <Divider mt="md" />
            </div>
          );
        })}
      </Stack>
    </Paper>
  );
}
