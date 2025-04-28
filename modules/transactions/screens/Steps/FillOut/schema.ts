import * as yup from "yup";

export const schema = yup.object().shape({
  bankOrigin: yup.string().required("El banco de origen es obligatorio"),
  depositAccount: yup.string().required("La cuenta de depósito es obligatoria"),
  fundOrigin: yup.string().required("El origen de los fondos es obligatorio")
});
