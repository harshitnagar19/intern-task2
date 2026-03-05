import messageService from "../services/messageservices/message.service.ts";

const MarkExpireMessage = async()=>{
    try{
       const res = await messageService.updateStatusOnExpireInDeliveryMapping();
    //    console.log(res)
    }catch(err){
         console.log("MarkExpireMessage error:", err);
    }
}

export default MarkExpireMessage;