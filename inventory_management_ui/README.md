# ODIN Item Management / Inventory Management UI

A high-fidelity implementation of the ODIN Item Management interface reproducing the reference design screenshots.

## Features

1. **Fixed Dark-Blue Sidebar Navigation**:
   - Styled in ODIN's brand navy blue (`#1a2d6b`)
   - Custom ODIN squircle brand logo and "Item Management" subtitle
   - Interactive search bar filtering the 10 item categories in real-time
   - Active navigation item indicator with high-contrast pill styling and real-time record count badge
   - Responsive mobile drawer navigation with backdrop and smooth transitions

2. **Top Navigation Bar**:
   - Breadcrumb navigation (`Home / <Item Name>`) dynamically reflecting the active master item
   - User profile avatar (`AK`) with custom badge styling

3. **Master Items & Pages Supported**:
   - **Bin Master** (`bin_master` - 18 columns matching the reference screenshot)
   - **Branch Master** (`branch_master`)
   - **Inventory Ledger** (`inventory_ledger`)
   - **Location Master** (`location_master`)
   - **Reorder Rule** (`reorder_rule`)
   - **Stock Count Detail** (`stock_count_detail`)
   - **Stock Count Header** (`stock_count_header`)
   - **Stock Master** (`stock_master`)
   - **Store Master** (`store_master`)
   - **Warehouse Master** (`warehouse_master`)

4. **Table View & Controls**:
   - Header with item name, total record count, and item management badge
   - Toolbar displaying column count and record count (e.g., `18 columns · 0 records`)
   - Search field filtering table records across all fields in real-time
   - Smooth horizontal scrolling for database tables with scroll navigation buttons
   - Clean empty state matching the reference screenshot when 0 records exist
   - Status bar displaying record status and database table name (e.g., `bin_master`)

5. **Dynamic "Add Record" Modal**:
   - Centered modal dialog with backdrop
   - Fixed header with item title (`Add <item> record`) and description
   - Vertically scrollable body with 2-column layout
   - Dynamic form generation driven by database column metadata
   - Column names displayed as bold labels, database data types (`integer`, `character varying`, `numeric`, `timestamp without time zone`, `boolean`) displayed as helper text
   - Input validation ensuring data integrity before record creation
   - Live updates to table and category badges upon record submission

## Structure

```
inventory_management_ui/
├── components/
│   ├── AddRecordModal.tsx    # Centered dynamic record creation modal
│   ├── OdinLogo.tsx          # ODIN brand logo component
│   ├── PageHeader.tsx        # Top page title, description & pill badge
│   ├── Sidebar.tsx           # Fixed dark blue navigation sidebar
│   ├── TableCard.tsx         # Horizontally scrollable table with empty state & toolbar
│   └── TopNavbar.tsx         # Breadcrumb navigation & user profile
├── metadata.ts               # Authoritative database column schemas & definitions
├── types.ts                  # TypeScript interfaces and data types
├── InventoryManagementApp.tsx# Root integrated application component
├── page.tsx                  # Client page entrypoint
├── index.ts                  # Module exports
└── README.md                 # Documentation
```

