import type{ RowDataPacket } from "mysql2";
export interface Message {
  id: number;
  template_id: number;
  schedule_type: number;
  sent_time?: string ;
  is_active: boolean;
  is_delete: boolean;
  created_by: number;
  created_on: Date;
  modified_by: number;
  modified_on: Date;
}

export interface MessageQuery extends Message, RowDataPacket {}
