import { Search, X } from 'lucide-react';
import OdinLogo from './OdinLogo';
import { MenuItemConfig, RecordItem } from '../types';

interface SidebarProps {
  menuItems: MenuItemConfig[];
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
  recordsByTable: Record<string, RecordItem[]>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  menuItems,
  selectedItemId,
  onSelectItem,
  recordsByTable,
  searchQuery,
  onSearchChange,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  // Filter items based on search query
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="odin-mobile-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 45,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          backgroundColor: '#162a69',
          width: '280px',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
        className={`odin-sidebar flex flex-col text-white transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'odin-sidebar-mobile-open' : 'odin-sidebar-mobile-closed'
        }`}
      >
        {/* Header: ODIN Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 20px 20px 20px',
          }}
        >
          <OdinLogo />
          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Items Bar */}
        <div style={{ padding: '0 16px 16px 16px' }}>
          <label
            style={{
              display: 'block',
              padding: '0 4px',
              marginBottom: '8px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'rgba(191, 219, 254, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            ITEMS
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                width: '14px',
                height: '14px',
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search items..."
              style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                paddingLeft: '34px',
                paddingRight: '12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 12px 16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedItemId;
            const recordCount = recordsByTable[item.tableName]?.length || 0;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectItem(item.id);
                  onCloseMobile();
                }}
                style={
                  isSelected
                    ? {
                        backgroundColor: '#ffffff',
                        color: '#162a69',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        fontWeight: 600,
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: 400,
                      }
                }
                className="group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors duration-150 hover:bg-white/10"
              >
                <span className="truncate">{item.name}</span>
                <span
                  style={
                    isSelected
                      ? { color: '#94a3b8', fontSize: '12px', fontWeight: 500 }
                      : { color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }
                  }
                >
                  {recordCount}
                </span>
              </button>
            );
          })}

          {filteredItems.length === 0 && (
            <div
              style={{
                padding: '24px 12px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              No menu items match your search
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
