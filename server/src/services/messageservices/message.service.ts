import { error } from "node:console";
import { pool } from "../../config/db.ts";
import type { MessageQuery } from "./message.interface.ts";
import moment from "moment";

const messageService = {
  addMessage: async (
    category_id: number,
    title: string,
    description: string,
    schedule_type: number,
    sent_time: string,
    created_by: number,
  ) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [templateResult]: any = await connection.execute(
        `
        INSERT INTO template (category_id , title, description, created_by ,modified_by)
        VALUES (?, ?, ?, ?,?)
        `,
        [category_id, title, description, created_by, created_by],
      );
      const template_id = templateResult.insertId;

      const [messageResult]: any = await connection.execute(
        `
        INSERT INTO message
        (template_id, schedule_type, sent_time, created_by,modified_by)
        VALUES (?, ?, ?, ?, ?)
        `,
        [template_id, schedule_type, sent_time, created_by, created_by],
      );
      await connection.commit();
      return {
        status: 200,
        message: "Message Added Sucessfully",
        template_id,
        messageId: messageResult.insertId,
      };
    } catch (err: any) {
      await connection.rollback();
      console.log("Transaction error:", err.message);
      console.log("error: ", err.message);
      throw error;
    } finally {
      connection.release();
    }
  },

  getAllMessages: async (): Promise<MessageQuery[]> => {
    const [rows] = await pool.execute<MessageQuery[]>(`
    SELECT *
    FROM message
    WHERE is_active = 1
      AND is_delete = 0
  `);
    return rows;
  },

  getAllMessageById: async (id: number) => {
    const [rows]: any = await pool.execute(
      `
    SELECT *
    FROM message
    WHERE id = ?
    `,
      [id],
    );
    return rows[0];
  },
  getAllDeliveryMapping: async (limit:number , page:number) => {
    const offset = (page-1)*limit;
    const [rows]: any = await pool.execute(`
    SELECT * FROM delivery_mapping order by id LIMIT ${limit} OFFSET ${offset}
  `);
    return rows;
  },
  getDeliveredMessageIds: async (): Promise<number[]> => {
    const [rows]: any = await pool.execute(`
    SELECT message_id FROM delivery_mapping
  `);
    return rows.map((r: any) => r.message_id);
  },

  addMessageInDeliveryMapping: async (messageId: number, expireOn: string) => {
    try {
      // current time in 24 hour format
      const sentOn = moment().format("YYYY-MM-DD HH:mm:ss");

      const [row] = await pool.execute(
        `
      INSERT INTO delivery_mapping
      (message_id, user_id, status, expire_on, sent_on)
      VALUES (?, ?, ?, ?, ?)
      `,
        [messageId, 1, 1, expireOn, sentOn],
      );

      return row;
    } catch (err: any) {
      console.log("error:", err.message);
      throw err;
    }
  },

  updateStatusOnExpireInDeliveryMapping: async () => {
    try {
      const [row] = await pool.execute(
        `
        UPDATE delivery_mapping
        SET status = 2
        WHERE expire_on <= NOW();
        `,
      );
      return row;
    } catch (err: any) {
      console.log("error:", err.message);
      throw err;
    }
  },
};

export default messageService;
