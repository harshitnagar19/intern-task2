import moment from "moment";
import type { MessageConfig } from "../../../services/messageConfigServices/messageConfig.interface.ts";
import messageConfigService from "../../../services/messageConfigServices/messageConfig.service.ts";
import messageService from "../../../services/messageservices/message.service.ts";
import { throwError } from "../../../utils/error/throw.error.ts";
import { addMessageValidationSchema } from "../../../validations/message.validation.ts";
import type { InputType } from "./addmessage.interface.ts";

const isCategoryIdCorrect = async (id: number): Promise<boolean> => {
  const messageConfig: MessageConfig[] =
    await messageConfigService.getAllConfig();

  const config = messageConfig.find(
    (config) => config.config_key === "message_config",
  );

  if (!config) return false;

  const config_value = JSON.parse(config.config_value as string);

  return config_value.some((item: { id: number }) => item.id === id);
};
const isValidDateTime = (dateTime: string): boolean => {
  const inputTime = moment(dateTime, "YYYY-MM-DD HH:mm:ss", true);

  return inputTime.isValid() && inputTime.isAfter(moment());
};
export const addMessage = async (
  _: any,
  { input }: { input: InputType },
  // context: { userEmail: string },
) => {
  try {
    const { value, error }: { value: InputType; error: any } =
      addMessageValidationSchema.validate(input);
    if (error) {
      throwError(error);
    }
    //   console.log("input value --------->", value);
    const isCategoryId: boolean = await isCategoryIdCorrect(value.category_id);

    if (!isCategoryId) {
      throwError({ message: "Wrong category_id" }, "INVALID_CATEGORY_ID");
    }

    // const user: User[] = await userService.getUser("email", context.userEmail);
    // if (user.length <= 0) {
    //   throwError(
    //     { message: "Something Went Wrong to Fetch User with Token-Email" },
    //     "USER_NOT_FOUND",
    //   );
    // }
    // const created_by = user[0]?.id;

    const {
      category_id,
      title,
      description,
      schedule_type,
      created_by,
      sent_time,
    } = input;
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    if (input.schedule_type == 0) {
      // for message now logic
      const response = await messageService.addMessage(
        category_id,
        title,
        description,
        schedule_type,
        currentTime,
        created_by as number,
      );
      return response;
    } else if (input.schedule_type == 1) {
      // for message later logic
      if (sent_time && isValidDateTime(sent_time)) {
        const response = await messageService.addMessage(
          category_id,
          title,
          description,
          schedule_type,
          sent_time,
          created_by as number,
        );
        return response;
      }else{
        throwError(
        { message: "sent_time is required" },
        "INVALID SENT_TIME",
      );
      }
    } else {
      throwError(
        { message: "schedule_type can be 0 and 1" },
        "INVALID_SCHEDULE_TYPE",
      );
    }
  } catch (err: any) {
    throw err;
    // throwError(err , "Wrong category_id");
  }
};
