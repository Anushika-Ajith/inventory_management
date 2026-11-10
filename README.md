# ODIN Inventory Management Frontend

A standalone, production-ready Next.js frontend implementing the ODIN Item Management interface.

## Overview

This repository contains the independent frontend application for ODIN Item Management / Inventory Control, supporting 10 master data categories with complete form generation, validation, search, and responsive desktop/tablet/mobile layouts.

## Features

- **Fixed Dark-Navy Sidebar**:
  - Exact ODIN brand navy blue (`#162a69`) and authentic ODIN 'O' logo
  - Dynamic item search filtering 10 item categories in real time
  - Selected item pill badge with live record counts
  - Responsive slide-out drawer on mobile & tablet viewports with backdrop
- **Top Navigation Bar**:
  - Dynamic breadcrumb navigation (`Home / <Item Name>`)
  - User profile avatar (`AK`)
- **Master Tables Supported**:
  - **Bin Master** (`bin_master` - 18 PostgreSQL columns matching reference)
  - **Branch Master** (`branch_master`)
  - **Inventory Ledger** (`inventory_ledger`)
  - **Location Master** (`location_master`)
  - **Reorder Rule** (`reorder_rule`)
  - **Stock Count Detail** (`stock_count_detail`)
  - **Stock Count Header** (`stock_count_header`)
  - **Stock Master** (`stock_master`)
  - **Store Master** (`store_master`)
  - **Warehouse Master** (`warehouse_master`)
- **Table Card & Toolbar**:
  - Real-time column count and record count
  - Instant table search across all fields
  - Custom horizontal scrollbar track with `<` and `>` arrow navigation buttons (no duplicate native scrollbars)
  - Centered empty-state container matching reference design
  - Status footer with active database table name
- **Dynamic Add Record Modal**:
  - Centered modal dialog (`max-width: min(720px, calc(100vw - 32px))`, `maxHeight: min(85vh, 760px)`)
  - Two-column responsive CSS grid (`minmax(0, 1fr)`) collapsing cleanly on mobile
  - Consistent 28px horizontal padding on header, scrollable body, and footer
  - Dynamic input field generation driven by column metadata
  - Displays PostgreSQL data types (`integer`, `character varying`, `numeric`, `timestamp without time zone`, `boolean`) as helper text
  - Type-safe validation before state updates

## Project Structure

```
inventory_management/
├── inventory_management_ui/
│   ├── components/
│   │   ├── AddRecordModal.tsx    # Record creation modal
│   │   ├── OdinLogo.tsx          # Authentic ODIN logo
│   │   ├── PageHeader.tsx        # Title, subtitle & badge
│   │   ├── Sidebar.tsx           # Fixed navy sidebar & mobile drawer
│   │   ├── TableCard.tsx         # Horizontally scrollable data table
│   │   └── TopNavbar.tsx         # Breadcrumbs & profile avatar
│   ├── metadata.ts               # 10 master table schemas & column definitions
│   ├── types.ts                  # TypeScript types & database data types
│   ├── InventoryManagementApp.tsx# Root integrated inventory component
│   ├── page.tsx                  # Client entrypoint
│   └── index.ts                  # Clean module exports
├── src/
│   ├── app/
│   │   ├── globals.css           # Global Tailwind styles
│   │   ├── layout.tsx            # Root application layout
│   │   ├── page.tsx              # Root home page (renders Inventory UI)
│   │   └── inventory-management/
│   │       └── page.tsx          # Dedicated /inventory-management route
│   └── lib/
│       └── config.ts             # API and environment configuration
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript compiler options
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Anushika-Ajith/inventory_management.git
cd inventory_management

# Switch to the UI branch
git checkout inventory_management_ui

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/inventory-management](http://localhost:3000/inventory-management) in your browser.

### Building for Production

```bash
# Build the production application
npm run build

# Start the production server
npm run start
```
