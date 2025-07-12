import * as Yup from "yup";

export const productValidation = Yup.object().shape({
  size: Yup.string().required("Size is required"),
  digitCount: Yup.number().required("Digit count is required"),
  color: Yup.string().required("Color is required"),
  lightColor: Yup.string().required("Light color is required"),
  houseNumber: Yup.string().required("House number is required"),
  text: Yup.string().required("Text is required"),
  design: Yup.string().required("Design is required"),
  font: Yup.string().required("Font is required"),
  quantity: Yup.number().required("Quantity is required"),
});
