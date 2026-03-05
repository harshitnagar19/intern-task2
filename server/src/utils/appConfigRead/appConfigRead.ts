import fs from "fs"
import path from "path"
import type { appConfigRead } from "./appConfigRead.Interface.ts";
import { fileURLToPath } from "url";

const  readAppConfig = ()=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname , "../../../../app-config.json");
    const fileData:appConfigRead = JSON.parse(fs.readFileSync(filePath , "utf-8"))

    return {
        db:fileData.db,
        app:fileData.app,
        jwtkey:fileData?.jwtkey,
        server:fileData.server
    }

}

export default readAppConfig;