export type DatabaseDataType =
  | 'integer'
  | 'character varying'
  | 'numeric'
  | 'timestamp without time zone'
  | 'boolean';

export interface ColumnDefinition {
  name: string;
  dataType: DatabaseDataType;
  isPrimaryKey?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean;
}

export interface MenuItemConfig {
  id: string;
  name: string;
  tableName: string;
  description?: string;
  columns: ColumnDefinition[];
}

export type RecordItem = Record<string, string | number | boolean | null | undefined>;

export interface InventoryStoreState {
  recordsByTable: Record<string, RecordItem[]>;
}

