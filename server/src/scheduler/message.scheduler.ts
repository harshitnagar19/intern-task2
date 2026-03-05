import cron, { validate } from "node-cron";
import MessageMapping from "../messagemapping/MessageMapping.ts";
import MarkExpireMessage from "../messagemapping/MarkExpireMessage.ts";


cron.schedule("*/5 * * * * *", async () => {
  MessageMapping();
  MarkExpireMessage();
});
