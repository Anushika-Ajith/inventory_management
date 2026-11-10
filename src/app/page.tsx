import type { Metadata } from 'next';
import InventoryManagementApp from '../../inventory_management_ui/InventoryManagementApp';

export const metadata: Metadata = {
  title: 'Inventory Management | ODIN',
  description: 'ODIN Item Management & Inventory Control',
};

export default function HomePage() {
  return <InventoryManagementApp />;
}
