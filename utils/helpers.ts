import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import currency from "currency.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrencySymbol = (currency: string | null | undefined) => {
  if (!currency) return "";
  return currency === "PEN" ? "S/" : "$";
};

export const isCurrentDate = (created: string | null) => {
  const peruTimezone = "America/Lima";

  const createdAtPeru = dayjs(created)
    .tz(peruTimezone)
    .add(1, "day") // Subtracting one day for testing purposes
    .format("YYYY-MM-DD");
  const nowInPeru = dayjs().tz(peruTimezone).format("YYYY-MM-DD");
  const isSameDay = createdAtPeru === nowInPeru;

  return isSameDay;
};

export const formatCurrency = (
  value: number | string,
  currencySymbol: string
) => {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;
  return currency(parsedValue, {
    symbol: currencySymbol || "",
    decimal: ".",
    separator: ",",
    precision: 2,
    format: (value, options) => {
      return options?.symbol ? `${options.symbol} ${value}` : `${value}`;
    }
  }).format();
};

export const bankLogos: Record<number, string> = {
  1: "https://yt3.googleusercontent.com/YiYGf83GoGGvZNyOPkWaYbx72NZgrNOXJula93d0jnznWyosF72pO7Psvv1IIa7iKJHWa6wl3A=s900-c-k-c0x00ffffff-no-rj",
  2: "https://play-lh.googleusercontent.com/vjYx0jloYA0BSr6fHPhvhhIbgieH0jmOV3fv_evGkj9bxxjITNO3Yhfux77bq2_HvBIF",
  3: "https://i.pinimg.com/736x/af/7a/63/af7a637e7894bc72e0b0a796805419fa.jpg",
  4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKjllMiO62tg4_E5aoK5wXOb4hL4VHXj4Pw&s",
  5: "https://yt3.googleusercontent.com/v-PEEMoBel089hJXySyR7rJjOwzmWEAzgquul5X4YjWe9Br8Tn7j9N8jNQkOCBtyZ20orEgX590=s900-c-k-c0x00ffffff-no-rj",
  6: "https://i.pinimg.com/474x/a9/3f/14/a93f145245c47ac7908de6af0a772662.jpg",
  7: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2SnAtpIXNDQjefOuBr-crQYaAwaxSSLYB5A&s",
  8: "https://1000marcas.net/wp-content/uploads/2020/07/logo-Citibank.jpg"
};
