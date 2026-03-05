import { pool } from "../../config/db.ts";
import messageConfigService from "../messageConfigServices/messageConfig.service.ts";

const templateService = {
  getTemplateById: async (id: number) => {
    const [rows]: any = await pool.execute(
      `
    SELECT category_id
    FROM template
    WHERE id = ?
    `,
      [id],
    );
    return rows[0];
  },
  getAllTemplateById: async (id: number) => {
    const [rows]: any = await pool.execute(
      `
    SELECT *
    FROM template
    WHERE id = ?
    `,
      [id],
    );
    const msgConfig = await messageConfigService.getAllConfig();
    const config = msgConfig.find(
      (config) => config.config_key === "message_config",
    );
    const config_value = JSON.parse(config?.config_value as string);
    const updatedRows = rows.map((template:any)=>{
      // console.log(template)
      console.log(config_value.find((value:any) => value.id==template.category_id))
      return {
        ...template,
        category_id: config_value.find((value:any) => value.id==template.category_id)
      }
    })
    return updatedRows[0];
  },

  getAllTemplate: async () => {
    const [rows]: any = await pool.execute(
      `
    SELECT * FROM template
    `,
    );
    return rows;
  },
};

export default templateService;
