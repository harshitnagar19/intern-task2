import { error } from "node:console";
import { pool } from "../../config/db.ts";
import type{ MessageConfig, MessageConfigQuery } from "./messageConfig.interface.ts";

const messageConfigService = {
  getAllConfig: async ():Promise<MessageConfig[]> => {
    try {
      const [row] = await pool.execute<MessageConfigQuery[]>(
        `
        Select * from message_config 
        where is_active=1 
        and 
        is_delete=0;
        `,
      );
      return row;
    } catch (err: any) {
      console.log("error: ", err.message);
      throw error;
    }
  },

};

export default messageConfigService;