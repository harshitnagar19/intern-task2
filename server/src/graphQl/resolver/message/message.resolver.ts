import messageService from "../../../services/messageservices/message.service.ts"
import templateService from "../../../services/templateservices/tamplate.service.ts";

export const getAllMessages = async(_:any , args:any)=>{
    const {limit , page} = args
    const res = await messageService.getAllDeliveryMapping(limit , page);
    return res;
}