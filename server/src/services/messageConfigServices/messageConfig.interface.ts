import type { RowDataPacket } from "mysql2";

export interface MessageConfig {
  id: number;
  config_key: string;
  config_value: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MessageConfigQuery extends MessageConfig, RowDataPacket {}
