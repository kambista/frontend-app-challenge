import { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Icon from "./Icon";

/**
 * Ajusta la fecha a [min, max]. Usa mediodía local al comparar para evitar
 * desfaces de zona horaria con el picker nativo.
 */
const fechaDentroDeRango = (fecha: Date, min?: Date, max?: Date): Date => {
  let x = new Date(fecha.getTime());
  x.setHours(12, 0, 0, 0);
  if (min) {
    const lo = new Date(min.getTime());
    lo.setHours(12, 0, 0, 0);
    if (x.getTime() < lo.getTime()) x = new Date(lo);
  }
  if (max) {
    const hi = new Date(max.getTime());
    hi.setHours(12, 0, 0, 0);
    if (x.getTime() > hi.getTime()) x = new Date(hi);
  }
  return x;
};

const fechaAStringIso = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parsearIsoAFechaLocal = (iso: string): Date | null => {
  const t = iso.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return null;
  const [y, m, d] = t.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
};

/** ISO `YYYY-MM-DD` → `DD/MM/AAAA` para el botón. */
const isoABotonDdMmAaaa = (iso: string): string => {
  const t = iso.trim();
  const [y, m, d] = t.split("-");
  if (!y || !m || !d) return t;
  return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
};

export type DatePickerProps = {
  value: string;
  onChange: (isoDate: string) => void;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Elige la fecha",
  maximumDate: maximumDateProp,
  minimumDate,
}: DatePickerProps) => {
  const insets = useSafeAreaInsets();

  /** Fijado al montar; si necesitas “hoy” siempre actualizado, pasa `maximumDate` desde el padre. */
  const fechaMaximaPorDefecto = useMemo(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }, []);

  const fechaMaxima = maximumDateProp ?? fechaMaximaPorDefecto;

  const fechaParaPicker = (): Date => {
    const parsed = parsearIsoAFechaLocal(value.trim());
    if (parsed) {
      return fechaDentroDeRango(parsed, minimumDate, fechaMaxima);
    }
    return fechaDentroDeRango(new Date(), minimumDate, fechaMaxima);
  };

  const [abiertoIos, setAbiertoIos] = useState(false);
  const [borradorIos, setBorradorIos] = useState<Date>(() => fechaParaPicker());

  const abrirCalendario = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: fechaParaPicker(),
        mode: "date",
        display: "default",
        maximumDate: fechaMaxima,
        minimumDate,
        onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
          if (event.type === "dismissed") return;
          if (selectedDate) onChange(fechaAStringIso(selectedDate));
        },
      });
      return;
    }
    setBorradorIos(fechaParaPicker());
    setAbiertoIos(true);
  };

  const alCambiarRuedaIos = (_: DateTimePickerEvent, date?: Date) => {
    if (date) setBorradorIos(date);
  };

  const confirmarIos = () => {
    onChange(fechaAStringIso(borradorIos));
    setAbiertoIos(false);
  };

  const cancelarIos = () => setAbiertoIos(false);

  const hayValor = Boolean(value.trim());
  const etiqueta = hayValor ? isoABotonDdMmAaaa(value) : placeholder;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fecha de nacimiento"
        onPress={abrirCalendario}
        className="min-h-[52px] w-full flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-3.5"
      >
        <Text
          className={
            hayValor
              ? "flex-1 text-base text-kambista-navy"
              : "flex-1 text-base text-gray-400"
          }
          numberOfLines={1}
        >
          {etiqueta}
        </Text>
        <Icon name="calendar-outline" size={20} color="#6B7280" />
      </Pressable>

      {Platform.OS === "ios" ? (
        <Modal
          visible={abiertoIos}
          transparent
          animationType="slide"
          onRequestClose={cancelarIos}
        >
          <View className="flex-1 justify-end bg-black/40">
            <Pressable className="flex-1" onPress={cancelarIos} />
            <View
              className="rounded-t-2xl bg-white"
              style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            >
              <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
                <Pressable onPress={cancelarIos} hitSlop={8}>
                  <Text className="text-base text-gray-500">Cancelar</Text>
                </Pressable>
                <Text className="text-base font-semibold text-kambista-navy">
                  Fecha de nacimiento
                </Text>
                <Pressable onPress={confirmarIos} hitSlop={8}>
                  <Text className="text-base font-semibold text-[#5BE2C4]">
                    Listo
                  </Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={borradorIos}
                mode="date"
                display="spinner"
                themeVariant="light"
                maximumDate={fechaMaxima}
                minimumDate={minimumDate}
                onChange={alCambiarRuedaIos}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
};
