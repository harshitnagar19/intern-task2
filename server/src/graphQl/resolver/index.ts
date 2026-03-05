import messageService from "../../services/messageservices/message.service.ts";
import templateService from "../../services/templateservices/tamplate.service.ts";
import userService from "../../services/user.service.ts";
import { addMessage } from "../mutation/addmessage/addmessage.resolver.ts";
import { getAllMessages } from "./message/message.resolver.ts";
import { getAllTemplate } from "./message/template/template.resolver.ts";
import { getAllUser } from "./user/user.resolver.ts";

export const resolver = {
  Query: {
    User: getAllUser,
    GetAllMessages: getAllMessages,
    Template: getAllTemplate,
  },

  Mutation: {
    addMessage: addMessage,
  },

  GetAllMessages: {
    message_id: async (parent: any) => {
      return await messageService.getAllMessageById(parent.message_id);
    },
  },
  Message: {
    template_id: async (parent: any) => {
      return await templateService.getAllTemplateById(parent.template_id);
    },
    created_by: async (parent: any) => {
      return await userService.getUserById(parent.created_by);
    },
  },

};
