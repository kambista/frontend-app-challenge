import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Correo electrónico no válido"
    )
    .required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
  rememberMe: yup.boolean().default(false)
});
