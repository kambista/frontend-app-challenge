import * as yup from "yup";

export const schema = yup.object().shape({
  accountType: yup.string().required("El tipo de cuenta es obligatorio"),
  bankName: yup.string().required("El nombre del banco es obligatorio"),
  accountNumber: yup.string().when("accountType", {
    is: "current",
    then: yup
      .string()
      .matches(
        /^\d{13}$/,
        "El número de cuenta debe tener 13 dígitos si el tipo es corriente"
      )
      .required("El número de cuenta es obligatorio"),
    otherwise: yup
      .string()
      .matches(/^\d{14}$/, "El número de cuenta solo debe contener números")
      .required("El número de cuenta es obligatorio")
  }),
  accountAlias: yup.string().required("El alias de la cuenta es obligatorio"),
  isMyAccount: yup
    .boolean()
    .oneOf([true], "Debe ser verdadero")
    .required("La propiedad de la cuenta es obligatoria")
});
