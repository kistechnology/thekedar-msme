"use client";

import {
  Paper,
  Title,
  Stack,
  Group,
  TextInput,
  Textarea,
  Button,
  ActionIcon,
  Text,
  FileButton,
  Image,
  Box,
  Modal,
  ScrollArea,
  SimpleGrid,
  Card,
} from "@mantine/core";
import { Trash, Plus, Upload, ImageIcon } from "lucide-react";
import { useState } from "react";
import type { TemplateItem } from "@/types/quotation";
import {
  getAvailableImageAssets,
  getImageAssetPath,
  isAssetImage,
} from "@/lib/utils/imageAssets";
import { autoCorrectText } from "@/lib/utils/autoCorrect";

interface ItemDetailsFormProps {
  items: TemplateItem[];
  onChange: (items: TemplateItem[]) => void;
}

export default function ItemDetailsForm({
  items,
  onChange,
}: ItemDetailsFormProps) {
  const [imageSelectModalOpen, setImageSelectModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const availableImages = getAvailableImageAssets();

  const handleAddItem = () => {
    const newItem: TemplateItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      itemCode: "",
      description: "",
      drawing: null,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof TemplateItem, value: string | null) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleImageUpload = (id: string, file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleItemChange(id, "drawing", base64String);
    };
    reader.readAsDataURL(file);
  };

  const openImageSelectModal = (itemId: string) => {
    setCurrentItemId(itemId);
    setImageSelectModalOpen(true);
  };

  const handleSelectAssetImage = (imagePath: string) => {
    if (currentItemId) {
      handleItemChange(currentItemId, "drawing", imagePath);
      setImageSelectModalOpen(false);
      setCurrentItemId(null);
    }
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" mb="md">
        <div>
          <Title order={4} mb="xs">
            Item Details
          </Title>
          <Text size="sm" c="dimmed">
            Define standard items/components that you manufacture
          </Text>
        </div>
        <Button
          leftSection={<Plus size={16} />}
          onClick={handleAddItem}
          size="sm"
        >
          Add Item
        </Button>
      </Group>

      {items.length === 0 ? (
        <Paper p="xl" radius="md" withBorder style={{ textAlign: "center" }}>
          <Text c="dimmed" mb="md">
            No items added yet. Click "Add Item" to create your first item.
          </Text>
          <Button
            leftSection={<Plus size={16} />}
            onClick={handleAddItem}
            variant="light"
          >
            Add First Item
          </Button>
        </Paper>
      ) : (
        <Stack gap="md">
          {items.map((item, index) => (
            <Paper key={item.id} p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text fw={600} size="sm" c="blue">
                  Item #{index + 1}
                </Text>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash size={18} />
                </ActionIcon>
              </Group>

              <Stack gap="md">
                <Group grow>
                  <TextInput
                    label="Item Code"
                    placeholder="e.g., WIN-001, DOOR-002"
                    value={item.itemCode}
                    onChange={(e) =>
                      handleItemChange(item.id, "itemCode", e.target.value.toUpperCase())
                    }
                    onBlur={(e) => {
                      const corrected = e.target.value.toUpperCase().trim();
                      if (corrected !== item.itemCode) {
                        handleItemChange(item.id, "itemCode", corrected);
                      }
                    }}
                    required
                  />
                  <TextInput
                    label="Item Description"
                    placeholder="e.g., Sliding Window, Casement Door"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, "description", e.target.value)
                    }
                    onBlur={(e) => {
                      const corrected = autoCorrectText(e.target.value);
                      if (corrected !== item.description) {
                        handleItemChange(item.id, "description", corrected);
                      }
                    }}
                    required
                  />
                </Group>

                <div>
                  <Text size="sm" fw={500} mb="xs">
                    Item Drawing (Optional)
                  </Text>
                  <Group gap="md" align="flex-start">
                    <Group gap="xs">
                      <FileButton
                        onChange={(file) => handleImageUpload(item.id, file)}
                        accept="image/png,image/jpeg,image/jpg"
                      >
                        {(props) => (
                          <Button
                            {...props}
                            leftSection={<Upload size={16} />}
                            variant="light"
                            size="sm"
                          >
                            Upload
                          </Button>
                        )}
                      </FileButton>
                      {availableImages.length > 0 && (
                        <Button
                          leftSection={<ImageIcon size={16} />}
                          variant="light"
                          size="sm"
                          onClick={() => openImageSelectModal(item.id)}
                        >
                          Select from Assets
                        </Button>
                      )}
                    </Group>
                    {item.drawing && (
                      <Box
                        style={{
                          position: "relative",
                          maxWidth: "200px",
                          maxHeight: "200px",
                        }}
                      >
                        <Image
                          src={isAssetImage(item.drawing) ? item.drawing : item.drawing}
                          alt={item.description || "Item drawing"}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                            border: "1px solid var(--mantine-color-gray-3)",
                            borderRadius: "4px",
                          }}
                        />
                        <Button
                          size="xs"
                          variant="subtle"
                          color="red"
                          onClick={() => handleItemChange(item.id, "drawing", null)}
                          style={{ position: "absolute", top: 4, right: 4 }}
                        >
                          Remove
                        </Button>
                      </Box>
                    )}
                  </Group>
                  <Text size="xs" c="dimmed" mt="xs">
                    {availableImages.length > 0
                      ? "Upload a PNG/JPEG image or select from available assets"
                      : "Upload a PNG or JPEG image of the item drawing/design"}
                  </Text>
                </div>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Image Selection Modal */}
      <Modal
        opened={imageSelectModalOpen}
        onClose={() => {
          setImageSelectModalOpen(false);
          setCurrentItemId(null);
        }}
        title="Select Image from Assets"
        size="lg"
      >
        {availableImages.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No images available in assets folder. Add images to{" "}
            <code>public/assets/images/</code> and update{" "}
            <code>lib/utils/imageAssets.ts</code>
          </Text>
        ) : (
          <ScrollArea h={400}>
            <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
              {availableImages.map((image) => (
                <Card
                  key={image.filename}
                  p="sm"
                  withBorder
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectAssetImage(image.path)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--mantine-color-blue-6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--mantine-color-gray-3)";
                  }}
                >
                  <Image
                    src={image.path}
                    alt={image.filename}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "contain",
                      marginBottom: "8px",
                    }}
                  />
                  <Text size="xs" c="dimmed" truncate>
                    {image.filename}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </ScrollArea>
        )}
      </Modal>
    </Stack>
  );
}
