import userService from "../../../services/user.service.ts"

export const getAllUser = async()=>{
    const data = await userService.getAllUser();
    return data
}