'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import PageHeader from './components/PageHeader';
import TableCard from './components/TableCard';
import AddRecordModal from './components/AddRecordModal';
import { INVENTORY_MENU_ITEMS } from './metadata';
import { RecordItem } from './types';

export default function InventoryManagementApp() {
  const [selectedItemId, setSelectedItemId] = useState<string>('bin_master');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // In-memory record store initialized for each table
  const [recordsByTable, setRecordsByTable] = useState<Record<string, RecordItem[]>>(() => {
    const initial: Record<string, RecordItem[]> = {};
    INVENTORY_MENU_ITEMS.forEach((item) => {
      initial[item.tableName] = [];
    });
    return initial;
  });

  // Current active item configuration
  const currentItem =
    INVENTORY_MENU_ITEMS.find((item) => item.id === selectedItemId) ||
    INVENTORY_MENU_ITEMS[0];

  const currentRecords = recordsByTable[currentItem.tableName] || [];

  const handleAddRecord = (newRecord: RecordItem) => {
    setRecordsByTable((prev) => ({
      ...prev,
      [currentItem.tableName]: [newRecord, ...(prev[currentItem.tableName] || [])],
    }));
  };

  return (
    <div
      style={{ backgroundColor: '#f8fafc', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden' }}
      className="text-slate-800"
    >
      {/* Scoped CSS for responsive sidebar, table scrollbar hiding, and modal styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Table custom scrollbar container: completely hide native scrollbar in all browsers */
            .odin-table-scroll-container::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
            .odin-table-scroll-container {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }

            /* Modal Form Scrollable Body */
            .modal-body-scrollable::-webkit-scrollbar {
              width: 6px;
            }
            .modal-body-scrollable::-webkit-scrollbar-track {
              background: transparent;
            }
            .modal-body-scrollable::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 9999px;
            }
            .modal-body-scrollable::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }

            /* Modal Responsive Grid */
            @media (max-width: 640px) {
              .modal-form-grid {
                grid-template-columns: minmax(0, 1fr) !important;
                row-gap: 14px !important;
              }
            }

            /* Responsive Sidebar Drawer */
            @media (max-width: 1023px) {
              .odin-sidebar-mobile-closed {
                transform: translateX(-100%);
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                z-index: 50;
              }
              .odin-sidebar-mobile-open {
                transform: translateX(0);
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                z-index: 50;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              }
              .odin-mobile-backdrop {
                display: block !important;
              }
            }
            @media (min-width: 1024px) {
              .odin-sidebar {
                transform: none !important;
                position: static !important;
                display: flex !important;
                width: 280px !important;
              }
              .odin-mobile-backdrop {
                display: none !important;
              }
            }
          `,
        }}
      />

      {/* 1. Left Sidebar (Fixed dark-navy matching reference) */}
      <Sidebar
        menuItems={INVENTORY_MENU_ITEMS}
        selectedItemId={selectedItemId}
        onSelectItem={(itemId) => {
          setSelectedItemId(itemId);
          setTableSearch('');
        }}
        recordsByTable={recordsByTable}
        searchQuery={sidebarSearch}
        onSearchChange={setSidebarSearch}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <TopNavbar
          selectedItemName={currentItem.name}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          userInitials="AK"
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mx-auto max-w-[1440px] space-y-6">
            {/* 2. Page Header */}
            <PageHeader
              title={currentItem.name}
              description={currentItem.description}
              badgeText="Item Management"
            />

            {/* 3. Main Table Card */}
            <TableCard
              itemName={currentItem.name}
              tableName={currentItem.tableName}
              columns={currentItem.columns}
              records={currentRecords}
              searchQuery={tableSearch}
              onSearchChange={setTableSearch}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          </div>
        </main>
      </div>

      {/* 4. Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        itemName={currentItem.name}
        tableName={currentItem.tableName}
        columns={currentItem.columns}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
}
