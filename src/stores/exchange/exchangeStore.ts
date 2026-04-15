import { create } from "zustand";
import type { ExchangeType } from "../../services/exchanges/exchanges.types";

type Exchange = {
    tab: ExchangeType;
    sendAmount: string;
    receiveAmount: string;
    bid: number;
    ask: number;
    coupon: string;
    /** Banco desde el que envían el dinero (paso completar datos) */
    originBankId: number | null;
    /** Cuenta destino seleccionada (id de cuenta usuario) */
    destinationCuentaId: string | null;
    /** Origen de fondos */
    sourceFundId: number | null;

    setData: (data: Partial<Omit<Exchange, "setData" | "reset">>) => void;
    reset: () => void;
}

export const useExchangeStore = create<Exchange>((set) => ({
    tab: "compra",
    sendAmount: "",
    receiveAmount: "",
    bid: 0,
    ask: 0,
    coupon: "",
    originBankId: null,
    destinationCuentaId: null,
    sourceFundId: null,
    setData: (data) => set(data),
    reset: () =>
        set({
            tab: "compra",
            sendAmount: "",
            receiveAmount: "",
            bid: 0,
            ask: 0,
            coupon: "",
            originBankId: null,
            destinationCuentaId: null,
            sourceFundId: null,
        }),
}));