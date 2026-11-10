import { useRef, useState, useEffect } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ColumnDefinition, RecordItem } from '../types';

interface TableCardProps {
  itemName: string;
  tableName: string;
  columns: ColumnDefinition[];
  records: RecordItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
}

function TableGridIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3.5" y="3.5" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="3.5" width="4.5" height="4.5" rx="1" />
      <rect x="16" y="3.5" width="4.5" height="4.5" rx="1" />
      <rect x="3.5" y="9.75" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" />
      <rect x="16" y="9.75" width="4.5" height="4.5" rx="1" />
      <rect x="3.5" y="16" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="16" width="4.5" height="4.5" rx="1" />
      <rect x="16" y="16" width="4.5" height="4.5" rx="1" />
    </svg>
  );
}

export default function TableCard({
  itemName,
  tableName,
  columns,
  records,
  searchQuery,
  onSearchChange,
  onOpenAddModal,
}: TableCardProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter records based on searchQuery
  const filteredRecords = records.filter((record) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return Object.values(record).some((val) =>
      String(val ?? '').toLowerCase().includes(query)
    );
  });

  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      } else {
        setScrollProgress(0);
      }
    }
  };

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableContainerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const { scrollWidth, clientWidth } = tableContainerRef.current;
    tableContainerRef.current.scrollTo({
      left: percentage * (scrollWidth - clientWidth),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = tableContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Top Section inside Card: 3x3 Table Icon + Item Name + Records Count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          paddingBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: '#eef4ff',
            color: '#2563eb',
            border: '1px solid #dbeafe',
            flexShrink: 0,
          }}
        >
          <TableGridIcon className="h-5 w-5" />
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.2,
            }}
          >
            {itemName}
          </h2>
          <p
            style={{
              margin: '2px 0 0 0',
              fontSize: '12px',
              color: '#94a3b8',
              fontWeight: 400,
            }}
          >
            {records.length} records
          </p>
        </div>
      </div>

      {/* Toolbar Section: Columns Count on Left, Search + Add on Right */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '12px',
          paddingBottom: '14px',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
          {columns.length} columns · {records.length} records
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Search records input */}
          <div
            style={{
              position: 'relative',
              width: '240px',
              maxWidth: '100%',
            }}
          >
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '14px',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search records..."
              style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                paddingLeft: '34px',
                paddingRight: '12px',
                fontSize: '12px',
                color: '#0f172a',
                outline: 'none',
              }}
            />
          </div>

          {/* Add record button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '34px',
              padding: '0 14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'background-color 150ms',
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add record</span>
          </button>
        </div>
      </div>

      {/* Table Container with Light-Blue Header & Pure Custom Scrollbar */}
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          ref={tableContainerRef}
          className="odin-table-scroll-container"
          style={{
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            width: '100%',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '12px',
              minWidth: 'max-content',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#edf2f9',
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                {columns.map((col) => (
                  <th
                    key={col.name}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '12px 16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1e293b',
                      borderRight: '1px solid rgba(226, 232, 240, 0.7)',
                    }}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>

            {filteredRecords.length > 0 && (
              <tbody>
                {filteredRecords.map((record, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.name}
                        style={{
                          whiteSpace: 'nowrap',
                          padding: '10px 16px',
                          fontSize: '12px',
                          color: '#334155',
                          borderRight: '1px solid rgba(241, 245, 249, 0.8)',
                        }}
                      >
                        {col.dataType === 'boolean'
                          ? record[col.name]
                            ? 'true'
                            : 'false'
                          : String(record[col.name] ?? '-')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/* Empty State Centered in the Visible Container (matching Screenshot 1 across all viewports) */}
        {filteredRecords.length === 0 && (
          <div
            style={{
              padding: '72px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#edf2f9',
                color: '#94a3b8',
                marginBottom: '12px',
              }}
            >
              <TableGridIcon className="h-6 w-6 text-slate-400" />
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
              }}
            >
              No records yet
            </p>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: 400,
              }}
            >
              Use &quot;Add record&quot; to enter a new item.
            </p>
          </div>
        )}

        {/* Single Scroll Helper Track matching Screenshot 1 - NO DUPLICATE NATIVE SCROLLBAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            padding: '4px 8px',
            color: '#94a3b8',
            height: '24px',
            boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll table left"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              padding: '2px',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <div
            onClick={handleTrackClick}
            style={{
              position: 'relative',
              flex: 1,
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: '#e2e8f0',
              margin: '0 8px',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '35%',
                borderRadius: '9999px',
                backgroundColor: '#94a3b8',
                transform: `translateX(${scrollProgress * 185}%)`,
                transition: 'transform 75ms ease-out',
              }}
            />
          </div>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll table right"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              padding: '2px',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Table Card Footer Status matching Screenshot 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '14px',
          fontSize: '12px',
          color: '#94a3b8',
        }}
      >
        <div>
          {records.length === 0
            ? 'No records added yet.'
            : `Showing ${filteredRecords.length} of ${records.length} records.`}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8' }}>
          {tableName}
        </div>
      </div>
    </div>
  );
}
