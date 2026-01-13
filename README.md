# Thekedar MSME - Quotation Management System

A Next.js 15 admin panel for Indian MSME manufacturing factories, focused on quotation template management.

## Features

✅ **Quotation Template Management**
- Create and manage reusable quotation templates
- Configure company details, items, terms & conditions
- Preview templates before saving
- Auto-generated logos from company name initials

✅ **Item Management**
- Define standard items/components with codes and drawings
- Upload custom images or select from asset library
- Auto-correction for item codes and descriptions

✅ **Terms & Conditions**
- Pre-configured standard terms
- Configurable values (percentages, days, etc.)
- Custom terms per category
- Auto-correction and spell checking

✅ **Template Preview**
- Live preview of quotation layout
- Multiple header/footer template options
- Real-time updates as you type

✅ **Professional UI**
- Mobile-first WhatsApp-like design
- Clean admin panel interface
- Responsive layout

## Tech Stack

- **Next.js 15** (App Router)
- **Refine** (MIT OSS) + **Mantine UI**
- **TailwindCSS** + **shadcn/ui**
- **Zustand** (State Management)
- **TypeScript**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

## Project Structure

```
thekedar-msme/
├── app/                    # Next.js pages
│   ├── templates/         # Template management pages
│   └── page.tsx           # Dashboard
├── components/            # React components
│   ├── layout/           # Layout components
│   └── quotation/       # Quotation components
├── lib/                   # Utilities and stores
│   ├── stores/           # Zustand stores
│   ├── data/             # Static data
│   └── utils/            # Helper functions
├── types/                 # TypeScript types
└── public/               # Static assets
    └── assets/images/    # Item drawing images
```

## Data Storage

All data is stored locally in the browser using:
- **Zustand** for state management
- **localStorage** for persistence

No backend or database required!

## License

Private project - All rights reserved
