import Joi from "joi";

export const addMessageValidationSchema = Joi.object({
  category_id: Joi.number().required().messages({
    "number.base": "category_id id must be a number",
    "any.required": "category_id id is required",
  }),
  title: Joi.string().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title cannot be empty",
    // "string.min": "Title should have at least 3 characters",
    // "string.max": "Title should not exceed 30 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().messages({
    "string.base": "description should be a type of text",
    "string.empty": "description cannot be empty",
    // "string.min": "description should have at least 3 characters",
    // "string.max": "description should not exceed 30 characters",
    "any.required": "description is required",
  }),
  schedule_type: Joi.number().messages({
    "number.base": "category_id id must be a number",
    "any.required": "category_id id is required",
  }),
  sent_time: Joi.string().optional().messages({
    "string.base": "Title should be a type of text",
  }),
  created_by:Joi.number().required().messages({
    "number.base": "category_id id must be a number",
    "any.required": "category_id id is required",
  })
});
