import * as yup from "yup";

export const registerUser = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  isAdm: yup.bool().required(),
});
