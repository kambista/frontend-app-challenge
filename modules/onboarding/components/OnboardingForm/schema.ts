import * as yup from "yup";
import dayjs from "dayjs";
import { DocumentType } from "@/types/storage/IDocument";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre no puede tener caracteres especiales ni números"
    ),
  documentType: yup
    .mixed<DocumentType>()
    .oneOf(["dni", "cce", "passport"], "Tipo de documento no válido")
    .required("El tipo de documento es obligatorio"),
  documentNumber: yup
    .string()
    .required("El número de documento es obligatorio")
    .when("documentType", {
      is: (documentType: DocumentType) => documentType === "dni",
      then: (schema) =>
        schema.matches(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos")
    })
    .when("documentType", {
      is: (documentType: DocumentType) => documentType === "cce",
      then: (schema) =>
        schema.matches(/^\d{9}$/, "El CE debe tener exactamente 9 dígitos")
    })
    .when("documentType", {
      is: (documentType: DocumentType) => documentType === "passport",
      then: (schema) =>
        schema.matches(
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,15}$/,
          "El pasaporte debe tener entre 8 y 15 caracteres alfanuméricos"
        )
    }),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^\d{9}$/, "Debe tener 9 dígitos"),
  birthDate: yup
    .string()
    .required("La fecha de nacimiento es obligatoria")
    .test("is-adult", "Debes ser mayor de edad", (value) => {
      if (!value) return false;
      const birthDate = dayjs(value, "YYYY-MM-DD");
      if (!birthDate.isValid()) return false;
      const today = dayjs();
      const age = today.diff(birthDate, "year");
      return age >= 18;
    }),
  previousCompany: yup.string().optional(),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required("Debes aceptar los términos y condiciones"),
  acceptPolicy: yup
    .boolean()
    .oneOf([true], "Debes aceptar la política de tratamiento de datos")
    .required("Debes aceptar la política de tratamiento de datos")
});
