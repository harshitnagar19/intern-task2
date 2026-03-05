import { pool } from "../config/db.ts";
import type { User, UserQueryInterface } from "./user.service.interface.ts";

const userService = {
  getAllUser: async (): Promise<User[]> => {
    const [row] = await pool.execute<UserQueryInterface[]>(`
           SELECT * FROM users 
            `);
    return row;
  },

  getUser: async (
    type: "userName" | "email",
    value: string,
  ): Promise<User[]> => {
    const [row] = await pool.execute<UserQueryInterface[]>(
      `SELECT * FROM users WHERE ${type} = ?`,
      [value],
    );
    return row;
  },

  getUserById: async (id: number) => {
    const [row] = await pool.execute<UserQueryInterface[]>(
      `SELECT * FROM users WHERE id = ?`,
      [id],
    );
    return row[0];
  },
};

export default userService;
