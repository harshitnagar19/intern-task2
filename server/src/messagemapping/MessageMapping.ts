import messageService from "../services/messageservices/message.service.ts";
import type { Moment } from "moment";
import moment from "moment";
import messageConfigService from "../services/messageConfigServices/messageConfig.service.ts";
import templateService from "../services/templateservices/tamplate.service.ts";
import type { MessageQuery } from "../services/messageservices/message.interface.ts";

const allValidMessages = (messages: MessageQuery[], currentTime: Moment) => {
  const validMessages = messages.filter((msg: any) => {
    const sentTime = moment(msg.sent_time, "YYYY-MM-DD HH:mm:ss", true);
    return sentTime.isSameOrBefore(currentTime);
  });
  return validMessages;
};

const MessageMapping = async () => {
  try {
    // STEP 1
    // get all message that is active and not deleted and their sent time is more than and equal to current time and and time is grater
    // or not calculate using moment lib
    const messages = await messageService.getAllMessages();
    const currentTime = moment();
    const validMessages = allValidMessages(messages, currentTime);

    // STEP 2
    // now in step 2 take all data from delivery mapping and filter only message that is not in deliverymapping
    const deliveredMessageIds = await messageService.getDeliveredMessageIds();
    const finalMessages = validMessages.filter(
      (msg: any) => !deliveredMessageIds.includes(msg.id),
    );

    // STEP 3
    const configRows = await messageConfigService.getAllConfig();

    const messageConfig = configRows.find(
      (c) => c.config_key === "message_config",
    );
    if (!messageConfig) return;
    const configValue = JSON.parse(messageConfig.config_value);

    for (const msg of finalMessages) {
      const template = await templateService.getTemplateById(msg.template_id);

      if (!template) continue;

      const categoryId = template.category_id;

      const config = configValue.find((c: any) => c.id === categoryId);

      if (!config) continue;

      const expiryminutes = config.default_expiry;
      const expireOn = moment(msg.sent_time, "YYYY-MM-DD HH:mm:ss", true).add(expiryminutes, "minutes").format("YYYY-MM-DD HH:mm:ss");
      console.log(expireOn);
      // api call karke add karna hai
      const res = await messageService.addMessageInDeliveryMapping(
        msg.id,
        expireOn,
      );
      console.log(res);
    }
  } catch (err) {
    console.log("MessageMapping error:", err);
  }
};

export default MessageMapping;
