"use client";

import { Paper, Title, Checkbox, Stack, Group, Text, Textarea, Divider, ScrollArea, Badge, Button, TextInput, Collapse } from "@mantine/core";
import { termsAndConditionsData, allTerms, formatTermWithValues, type Term } from "@/lib/data/termsAndConditions";
import { useState } from "react";

interface TermsSelectorProps {
  selectedTerms: string[];
  onChange: (selectedTerms: string[]) => void;
  termsConfig: Record<string, Record<string, string | number>>;
  onConfigChange: (termId: string, variableKey: string, value: string | number) => void;
  customTerms: Record<string, string>; // Custom terms per category: { categoryId: customText }
  onCustomTermsChange: (categoryId: string, customTerms: string) => void;
}

export default function TermsSelector({
  selectedTerms,
  onChange,
  termsConfig,
  onConfigChange,
  customTerms,
  onCustomTermsChange,
}: TermsSelectorProps) {
  // Only first category expanded by default, only one open at a time
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(termsAndConditionsData.length > 0 ? [termsAndConditionsData[0].id] : [])
  );
  const [expandedConfigTerms, setExpandedConfigTerms] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      // If clicking on an already expanded category, collapse it
      if (prev.has(categoryId)) {
        return new Set();
      }
      // Otherwise, close all and open only the clicked one (accordion behavior)
      return new Set([categoryId]);
    });
  };

  const handleTermToggle = (termId: string) => {
    if (selectedTerms.includes(termId)) {
      onChange(selectedTerms.filter((id) => id !== termId));
    } else {
      onChange([...selectedTerms, termId]);
      // Initialize default values for configurable terms
      const term = allTerms.find((t) => t.id === termId);
      if (term?.configurable && term.variables) {
        term.variables.forEach((variable) => {
          const currentConfig = termsConfig[termId] || {};
          if (!(variable.key in currentConfig)) {
            onConfigChange(termId, variable.key, variable.defaultValue);
          }
        });
      }
    }
  };

  const handleSelectAllInCategory = (category: typeof termsAndConditionsData[0]) => {
    const categoryTermIds = category.terms.map((t) => t.id);
    const allSelected = categoryTermIds.every((id) => selectedTerms.includes(id));
    
    if (allSelected) {
      // Deselect all in category
      onChange(selectedTerms.filter((id) => !categoryTermIds.includes(id)));
    } else {
      // Select all in category
      const newSelected = [...selectedTerms];
      categoryTermIds.forEach((id) => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      onChange(newSelected);
    }
  };

  return (
    <Stack gap="md">
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4} mb="xs">
              Standard Terms & Conditions
            </Title>
            <Text size="sm" c="dimmed">
              Select from {termsAndConditionsData.length} categories, {termsAndConditionsData.reduce((sum, cat) => sum + cat.terms.length, 0)} total terms
            </Text>
          </div>
          <Text size="sm" fw={500} c="blue">
            {selectedTerms.length} selected
          </Text>
        </Group>

        <ScrollArea h={500}>
          <Stack gap="md">
            {termsAndConditionsData.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const categoryTermIds = category.terms.map((t) => t.id);
              const selectedInCategory = categoryTermIds.filter((id) =>
                selectedTerms.includes(id)
              ).length;
              const allSelected = selectedInCategory === category.terms.length;

              return (
                <Paper key={category.id} p="sm" withBorder radius="sm">
                  <Group
                    justify="space-between"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleCategory(category.id)}
                    mb={isExpanded ? "sm" : 0}
                  >
                    <Group gap="sm">
                      <Text fw={600} size="sm">
                        {category.name}
                      </Text>
                      <Badge size="sm" variant="light" color={allSelected ? "green" : "gray"}>
                        {selectedInCategory}/{category.terms.length}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed" style={{ userSelect: "none" }}>
                      {isExpanded ? "▼" : "▶"}
                    </Text>
                  </Group>

                  {isExpanded && (
                    <Stack gap="xs" mt="sm">
                      <Group justify="flex-end">
                        <Button
                          variant="subtle"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAllInCategory(category);
                          }}
                          type="button"
                        >
                          {allSelected ? "Deselect All" : "Select All"}
                        </Button>
                      </Group>
                      <Divider />
                      {category.terms.map((term) => {
                        const isSelected = selectedTerms.includes(term.id);
                        const displayText = formatTermWithValues(term, termsConfig[term.id]);
                        const isConfigurable = term.configurable && term.variables && term.variables.length > 0;
                        const isConfigExpanded = expandedConfigTerms.has(term.id);
                        
                        return (
                          <Stack key={term.id} gap="xs">
                            <Group gap="xs" align="flex-start" wrap="nowrap">
                              <Checkbox
                                label={displayText}
                                checked={isSelected}
                                onChange={() => handleTermToggle(term.id)}
                                styles={{
                                  label: {
                                    fontSize: "13px",
                                    lineHeight: 1.5,
                                  },
                                  root: {
                                    flex: 1,
                                  },
                                }}
                              />
                              {isConfigurable && isSelected && (
                                <Button
                                  variant="subtle"
                                  size="xs"
                                  onClick={() => {
                                    setExpandedConfigTerms((prev) => {
                                      const newSet = new Set(prev);
                                      if (newSet.has(term.id)) {
                                        newSet.delete(term.id);
                                      } else {
                                        newSet.add(term.id);
                                      }
                                      return newSet;
                                    });
                                  }}
                                  type="button"
                                >
                                  {isConfigExpanded ? "Hide Config" : "Configure"}
                                </Button>
                              )}
                            </Group>
                            
                            {isConfigurable && isSelected && (
                              <Collapse in={isConfigExpanded}>
                                <Paper p="sm" withBorder radius="sm" style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
                                  <Text size="xs" fw={600} mb="xs" c="blue">
                                    Configure Values:
                                  </Text>
                                  <Stack gap="xs">
                                    {term.variables!.map((variable) => {
                                      const currentValue =
                                        termsConfig[term.id]?.[variable.key] ?? variable.defaultValue;

                                      return (
                                        <TextInput
                                          key={variable.key}
                                          label={variable.label}
                                          placeholder={`Enter ${variable.label.toLowerCase()}`}
                                          value={String(currentValue)}
                                          onChange={(e) => {
                                            const value = e.target.value;
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
                                          size="sm"
                                        />
                                      );
                                    })}
                                  </Stack>
                                </Paper>
                              </Collapse>
                            )}
                          </Stack>
                        );
                      })}
                      
                      {/* Custom Terms for this category */}
                      <Divider mt="md" mb="xs" />
                      <Textarea
                        label={`Custom Terms for ${category.name} (Optional)`}
                        placeholder={`Add any custom terms specific to ${category.name.toLowerCase()}`}
                        minRows={2}
                        value={customTerms[category.id] || ""}
                        onChange={(e) => onCustomTermsChange(category.id, e.target.value)}
                        description="These will be added after the selected standard terms for this category"
                        size="sm"
                      />
                    </Stack>
                  )}
                </Paper>
              );
            })}
          </Stack>
        </ScrollArea>
      </Paper>
    </Stack>
  );
}
