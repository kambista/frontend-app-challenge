import * as yup from "yup";

export const schema = yup.object().shape({
  amountIn: yup
    .string()
    .required("Amount in is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  amountOut: yup
    .string()
    .required("Amount out is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  couponCode: yup.string().optional()
});
