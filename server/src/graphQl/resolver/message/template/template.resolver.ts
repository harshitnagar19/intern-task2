import templateService from "../../../../services/templateservices/tamplate.service.ts"

export const getAllTemplate = async()=>{
    try{
        const res = await templateService.getAllTemplate();
        return res;
    }catch(err){
        console.log(err)
        return err;
    }
} 