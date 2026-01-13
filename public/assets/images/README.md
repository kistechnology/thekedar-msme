# Item Drawing Assets

Place your item drawing images in this folder.

## Usage

1. Add your image files (PNG, JPEG, JPG) to this folder
2. Update `lib/utils/imageAssets.ts` and add the filename to the `availableItemDrawings` array
3. The images will appear in the "Select from Assets" option when adding item drawings

## Example

If you add `sliding-window.png` to this folder, update `imageAssets.ts`:

```typescript
export const availableItemDrawings: string[] = [
  "sliding-window.png",
  // ... other images
];
```

## Supported Formats

- PNG
- JPEG/JPG

## Image Recommendations

- Keep file sizes reasonable (< 500KB recommended)
- Use descriptive filenames (e.g., `sliding-window.png`, `casement-door.jpg`)
- Recommended dimensions: 400x400px to 800x800px
