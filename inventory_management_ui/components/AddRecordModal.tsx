import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { ColumnDefinition, RecordItem } from '../types';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  tableName: string;
  columns: ColumnDefinition[];
  onAddRecord: (record: RecordItem) => void;
}

export default function AddRecordModal({
  isOpen,
  onClose,
  itemName,
  tableName,
  columns,
  onAddRecord,
}: AddRecordModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form whenever modal opens or columns change
  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, string> = {};
      columns.forEach((col) => {
        initial[col.name] = col.defaultValue !== undefined ? String(col.defaultValue) : '';
      });
      setFormData(initial);
      setErrors({});
    }
  }, [isOpen, columns]);

  if (!isOpen) return null;

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    columns.forEach((col) => {
      const val = formData[col.name]?.trim() ?? '';

      if (val) {
        // Check integer
        if (col.dataType === 'integer') {
          if (!/^-?\d+$/.test(val)) {
            newErrors[col.name] = 'Must be a valid integer';
          }
        }

        // Check numeric
        if (col.dataType === 'numeric') {
          if (isNaN(Number(val))) {
            newErrors[col.name] = 'Must be a valid number';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert types for final record
    const processedRecord: RecordItem = {};
    columns.forEach((col) => {
      const rawValue = formData[col.name]?.trim();
      if (!rawValue && rawValue !== '0') {
        processedRecord[col.name] = null;
        return;
      }

      if (col.dataType === 'integer') {
        processedRecord[col.name] = parseInt(rawValue, 10);
      } else if (col.dataType === 'numeric') {
        processedRecord[col.name] = parseFloat(rawValue);
      } else if (col.dataType === 'boolean') {
        processedRecord[col.name] = rawValue === 'true';
      } else {
        processedRecord[col.name] = rawValue;
      }
    });

    onAddRecord(processedRecord);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(3px)',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          width: 'min(720px, calc(100vw - 32px))',
          maxHeight: 'min(85vh, 760px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'relative',
          margin: 'auto',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Fixed Header with exact 28px horizontal padding */}
        <div
          style={{
            boxSizing: 'border-box',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '24px 28px 16px 28px',
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: '#ffffff',
          }}
        >
          <div>
            <h3
              id="modal-title"
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              Add {itemName.toLowerCase()} record
            </h3>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#64748b',
                lineHeight: 1.4,
              }}
            >
              Enter values for the fields below. Column names match the selected item.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'background-color 150ms, color 150ms',
              flexShrink: 0,
              marginLeft: '16px',
            }}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Vertically Scrollable Form Body with exact 28px horizontal padding */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 0%',
            minHeight: 0,
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          }}
        >
          <div
            className="modal-body-scrollable"
            style={{
              flex: '1 1 0%',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px 28px',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="modal-form-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '24px',
                rowGap: '16px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {columns.map((col) => {
                const hasError = !!errors[col.name];

                return (
                  <div
                    key={col.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 0,
                      boxSizing: 'border-box',
                    }}
                  >
                    <label
                      htmlFor={`input-${col.name}`}
                      style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1e293b',
                        lineHeight: 1.2,
                      }}
                    >
                      {col.name}
                    </label>

                    {col.dataType === 'boolean' ? (
                      <select
                        id={`input-${col.name}`}
                        value={formData[col.name] ?? ''}
                        onChange={(e) => handleChange(col.name, e.target.value)}
                        style={{
                          boxSizing: 'border-box',
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: hasError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          padding: '0 14px',
                          fontSize: '13px',
                          color: '#0f172a',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value=""></option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input
                        id={`input-${col.name}`}
                        type={
                          col.dataType === 'integer' || col.dataType === 'numeric'
                            ? 'number'
                            : 'text'
                        }
                        step={col.dataType === 'integer' ? '1' : 'any'}
                        value={formData[col.name] ?? ''}
                        onChange={(e) => handleChange(col.name, e.target.value)}
                        style={{
                          boxSizing: 'border-box',
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: hasError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          padding: '0 14px',
                          fontSize: '13px',
                          color: '#0f172a',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                        }}
                      />
                    )}

                    {/* Helper text showing exact PostgreSQL data type below input */}
                    <span
                      style={{
                        display: 'block',
                        marginTop: '4px',
                        fontSize: '11px',
                        color: '#64748b',
                        fontWeight: 400,
                        lineHeight: 1.3,
                      }}
                    >
                      {col.dataType}
                    </span>

                    {/* Validation Error UI */}
                    {hasError && (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '4px',
                          fontSize: '11px',
                          color: '#ef4444',
                        }}
                      >
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors[col.name]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fixed Footer with exact 28px horizontal padding */}
          <div
            style={{
              boxSizing: 'border-box',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '16px 28px',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#ffffff',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                boxSizing: 'border-box',
                height: '38px',
                padding: '0 18px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                fontWeight: 500,
                color: '#334155',
                cursor: 'pointer',
                transition: 'background-color 150ms',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                boxSizing: 'border-box',
                height: '38px',
                padding: '0 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2563eb',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'background-color 150ms',
              }}
            >
              Add record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
