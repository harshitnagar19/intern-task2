import type { RowDataPacket } from "mysql2";

export interface User{
    id:number,
    userName:string,
    email:string,
    password:string
}

 export interface UserQueryInterface  extends User , RowDataPacket{}