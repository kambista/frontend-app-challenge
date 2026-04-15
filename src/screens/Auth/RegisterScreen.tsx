import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import AppSafeArea from "../../components/AppSafeArea";
import BottomSheetModal from "../../components/BottomSheetModal";
import Button from "../../components/Button";
import CheckboxField from "../../components/CheckboxField";
import FieldLabel from "../../components/FieldLabel";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import { useRegister } from "../../hooks/auth/useRegister";
import type { RegisterPayload, TipoDocumento } from "../../services/auth/auth.types";
import type { AuthStackParamList, MainStackParamList } from "../../navigation/navigation.types";
import { DatePicker } from "../../components/DatePicker";
import util from "../../utils/util";
import { useAuthStore } from "../../stores/auth/authStore";

type RegisterFieldErrors = {
  email: string;
  password: string;
  nombresCompletos: string;
  numeroDocumento: string;
  celular: string;
  fechaNacimiento: string;
};

type RegisterScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, "Register">,
  NativeStackNavigationProp<MainStackParamList>
>;

const TIPO_DOC_LABEL: Record<TipoDocumento, string> = {
  dni: "DNI",
  cce: "CCE",
  pasaporte: "Pasaporte",
};

const TIPOS_DOCUMENTO: TipoDocumento[] = ["dni", "cce", "pasaporte"];

const validateEmailField = (value: string): string =>
  util.isValidEmail(value) ? "" : "Correo electrónico inválido";

const validatePasswordField = (value: string): string =>
  util.isValidPassword(value) ? "" : "Mínimo 8 caracteres";

const validateNombresField = (value: string): string =>
  util.isValidNombreCompleto(value) ? "" : "Usa solo letras y espacios";

const validateNumeroDocumento = (tipo: TipoDocumento, value: string): string => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (util.isValidNumeroDocumento(tipo, value)) return "";
  switch (tipo) {
    case "dni":
      return "El DNI debe tener 8 dígitos";
    case "cce":
      return "La CCE debe tener 9 dígitos";
    case "pasaporte":
      return "El pasaporte debe tener entre 8 y 15 caracteres alfanuméricos";
    default:
      return "Documento inválido";
  }
};

const validateCelularField = (value: string): string =>
  util.isValidCelular(value) ? "" : "Ingresa un celular de 9 dígitos";

const validateFechaField = (raw: string): string =>
  util.isValidFechaNacimientoMayorEdad(raw.trim())
    ? ""
    : "Debes ser mayor de edad e ingresar una fecha válida";

const emptyFieldErrors: RegisterFieldErrors = {
  email: "",
  password: "",
  nombresCompletos: "",
  numeroDocumento: "",
  celular: "",
  fechaNacimiento: "",
};

const RegisterScreen = () => {
  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    password: "",
    nombresCompletos: "",
    tipoDocumento: "dni",
    numeroDocumento: "",
    celular: "",
    fechaNacimiento: "",
  });
  const [docTypeOpen, setDocTypeOpen] = useState(false);
  const [highlightedTipo, setHighlightedTipo] = useState<TipoDocumento>("dni");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterFieldErrors>(emptyFieldErrors);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const setSession = useAuthStore((state) => state.setSession);
  const setPostRegisterSuccessPending = useAuthStore(
    (state) => state.setPostRegisterSuccessPending,
  );
  const { submit, isLoading, error } = useRegister();

  const handleChangeEmail = (text: string) => {
    setForm((f) => ({ ...f, email: text }));
    const trimmed = text.trim();
    setErrors((prev) => ({
      ...prev,
      email: trimmed.length > 0 ? validateEmailField(trimmed) : "",
    }));
  };

  const handleChangePassword = (text: string) => {
    setForm((f) => ({ ...f, password: text }));
    setErrors((prev) => ({
      ...prev,
      password: text.length > 0 ? validatePasswordField(text) : "",
    }));
  };

  const handleChangeNombres = (text: string) => {
    setForm((f) => ({ ...f, nombresCompletos: text }));
    const trimmed = text.trim();
    setErrors((prev) => ({
      ...prev,
      nombresCompletos: trimmed.length > 0 ? validateNombresField(trimmed) : "",
    }));
  };

  const handleChangeNumeroDocumento = (text: string) => {
    setForm((f) => ({ ...f, numeroDocumento: text }));
    const trimmed = text.trim();
    setErrors((prev) => ({
      ...prev,
      numeroDocumento:
        trimmed.length > 0
          ? validateNumeroDocumento(form.tipoDocumento, text)
          : "",
    }));
  };

  const handleChangeCelular = (text: string) => {
    setForm((f) => ({ ...f, celular: text }));
    const trimmed = text.trim();
    setErrors((prev) => ({
      ...prev,
      celular: trimmed.length > 0 ? validateCelularField(text) : "",
    }));
  };

  const handleChangeFecha = (iso: string) => {
    setForm((f) => ({ ...f, fechaNacimiento: iso }));
    setErrors((prev) => ({
      ...prev,
      fechaNacimiento:
        iso.trim().length > 0 ? validateFechaField(iso) : "",
    }));
  };

  const handleSubmit = async () => {
    const emailValue = form.email.trim();
    const passwordValue = form.password;
    const nombresValue = form.nombresCompletos.trim();
    const numeroValue = form.numeroDocumento.trim();
    const celularValue = form.celular.trim();
    const fechaRaw = form.fechaNacimiento;

    const nextErrors: RegisterFieldErrors = {
      email: !emailValue
        ? "Ingresa tu correo electrónico"
        : validateEmailField(emailValue),
      password: !passwordValue
        ? "Ingresa tu contraseña"
        : validatePasswordField(passwordValue),
      nombresCompletos: !nombresValue
        ? "Ingresa tus nombres completos"
        : validateNombresField(nombresValue),
      numeroDocumento: !numeroValue
        ? "Ingresa tu número de documento"
        : validateNumeroDocumento(form.tipoDocumento, form.numeroDocumento),
      celular: !celularValue
        ? "Ingresa tu celular"
        : validateCelularField(form.celular),
      fechaNacimiento: !fechaRaw.trim()
        ? "Ingresa tu fecha de nacimiento"
        : validateFechaField(fechaRaw),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some((e) => e !== "") || !termsAccepted || !policyAccepted) {
      return;
    }

    const payload: RegisterPayload = {
      email: emailValue,
      password: passwordValue,
      nombresCompletos: nombresValue,
      tipoDocumento: form.tipoDocumento,
      numeroDocumento: numeroValue,
      celular: celularValue,
      fechaNacimiento: fechaRaw.trim().slice(0, 10),
    };

    try {
      const res = await submit(payload);

      if (res.success) {
        setSession(res.data);
        setPostRegisterSuccessPending(true);
      }
    } catch (e) {
      console.log("[register] error", e);
    }
  };

  return (
    <>
      <AppSafeArea>
        <View className="mb-6 flex-row items-center">
          <Pressable
            accessibilityRole="button"
            className="w-11"
            hitSlop={8}
            onPress={() => navigation.navigate("Login")}
          >
            <Icon name="chevron-back" size={26} color="#0A1F33" />
          </Pressable>
          <Text className="flex-1 text-center text-base font-bold text-kambista-navy">
            Completa tus datos
          </Text>
          <Pressable
            accessibilityRole="button"
            className="w-11 items-end"
            hitSlop={8}
            onPress={() => { }}
          >
            <Icon name="log-out-outline" size={24} color="#0A1F33" />
          </Pressable>
        </View>

        <Text className="mb-8 px-1 text-center text-base leading-6 text-kambista-navy">
          Completa tus datos{" "}
          <Text className="font-bold">
            como figuran en tu documento de identidad
          </Text>
        </Text>

        <View className="mb-4 w-full">
          <FieldLabel>Correo electrónico</FieldLabel>
          <Input
            placeholder="Escribe tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.email}
            error={errors.email}
            onChangeText={handleChangeEmail}
          />
        </View>

        <View className="mb-4 w-full">
          <FieldLabel>Contraseña</FieldLabel>
          <Input
            placeholder="Mínimo 8 caracteres"
            showPasswordToggle
            value={form.password}
            error={errors.password}
            onChangeText={handleChangePassword}
          />
        </View>

        <View className="mb-4 w-full">
          <FieldLabel>Nombres completos</FieldLabel>
          <Input
            placeholder="Escribe tus nombres y apellidos"
            value={form.nombresCompletos}
            error={errors.nombresCompletos}
            onChangeText={handleChangeNombres}
          />
        </View>

        <FieldLabel>Documento</FieldLabel>
        <View className="mb-4 flex-row gap-3">
          <SelectField
            variant="compact"
            value={TIPO_DOC_LABEL[form.tipoDocumento]}
            placeholder=""
            onPress={() => {
              setHighlightedTipo(form.tipoDocumento);
              setDocTypeOpen(true);
            }}
          />
          <View className="min-w-0 flex-1">
            <Input
              placeholder="Nº de documento"
              keyboardType={
                form.tipoDocumento === "pasaporte" ? "default" : "number-pad"
              }
              autoCapitalize={
                form.tipoDocumento === "pasaporte" ? "characters" : "none"
              }
              inputClassName="h-[52px] px-4"
              value={form.numeroDocumento}
              error={errors.numeroDocumento}
              onChangeText={handleChangeNumeroDocumento}
            />
          </View>
        </View>

        <View className="mb-6 flex-row gap-3 rounded-xl bg-kambista-infoBg p-4">
          <Icon
            name="information-circle"
            size={22}
            color="#5BE2C4"
            style={{ marginTop: 2 }}
          />
          <Text className="flex-1 text-sm leading-5 text-kambista-infoText">
            Tu documento de identidad debe coincidir con tus datos para evitar
            inconvenientes al momento de hacer una primera operación
          </Text>
        </View>

        <View className="mb-6 flex-row gap-3">
          <View className="min-w-0 flex-1">
            <FieldLabel>Celular</FieldLabel>
            <Input
              placeholder="Nº de celular"
              keyboardType="phone-pad"
              inputClassName="px-3"
              value={form.celular}
              error={errors.celular}
              onChangeText={handleChangeCelular}
            />
          </View>
          <View className="min-w-0 flex-1">
            <FieldLabel>Fecha de nacimiento</FieldLabel>
            <DatePicker
              value={form.fechaNacimiento}
              onChange={handleChangeFecha}
            />
            {errors.fechaNacimiento ? (
              <Text className="mt-1 text-sm text-red-600">
                {errors.fechaNacimiento}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="mb-6 w-full">
          <FieldLabel optional>¿Dónde cambiabas antes?</FieldLabel>
          <SelectField
            placeholder="Último lugar de cambio"
            onPress={() => { }}
          />
        </View>

        <CheckboxField
          variant="navy"
          checked={termsAccepted}
          onPress={() => setTermsAccepted((v) => !v)}
          className="mb-4"
          label={
            <Text className="flex-1 text-sm leading-5 text-kambista-navy">
              He leído y acepto los{" "}
              <Text className="font-bold underline">Términos y condiciones</Text>
            </Text>
          }
        />

        <CheckboxField
          variant="navy"
          checked={policyAccepted}
          onPress={() => setPolicyAccepted((v) => !v)}
          className="mb-8"
          label={
            <Text className="flex-1 text-sm leading-5 text-kambista-navy">
              Acepto de manera expresa e informada la{" "}
              <Text className="font-bold underline">
                Política de Tratamiento de datos personales de Kambista
              </Text>
            </Text>
          }
        />

        {error ? (
          <Text className="mb-2 text-center text-sm text-red-600">{error}</Text>
        ) : null}

        <Button
          variant="fill"
          tone="register"
          className="mb-4"
          disabled={isLoading || !termsAccepted || !policyAccepted}
          onPress={handleSubmit}
        >
          REGISTRARME
        </Button>
      </AppSafeArea>

      { /* Modal de selección de tipo de documento */}
      <BottomSheetModal
        visible={docTypeOpen}
        onRequestClose={() => setDocTypeOpen(false)}
        onConfirm={() => {
          setForm((f) => ({ ...f, tipoDocumento: highlightedTipo }));
          setDocTypeOpen(false);
          setErrors((prev) => ({
            ...prev,
            numeroDocumento:
              form.numeroDocumento.trim().length > 0
                ? validateNumeroDocumento(
                    highlightedTipo,
                    form.numeroDocumento,
                  )
                : "",
          }));
        }}
      >
        {TIPOS_DOCUMENTO.map((t) => (
          <Pressable
            key={t}
            className={`py-3 ${highlightedTipo === t ? "bg-gray-100" : ""}`}
            onPress={() => setHighlightedTipo(t)}
          >
            <Text
              className={`text-center text-lg ${highlightedTipo === t
                  ? "font-semibold text-black"
                  : "text-gray-400"
                }`}
            >
              {TIPO_DOC_LABEL[t]}
            </Text>
          </Pressable>
        ))}
      </BottomSheetModal>
    </>
  );
};

export default RegisterScreen;
