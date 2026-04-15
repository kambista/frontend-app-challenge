export type ExchangeType = "compra" | "venta";

export type Exchange = {
    ask: number;
    bid: number;
};

export type Bank = {
    id: number;
    name: string;
    alias: string;
};

export type SourceFund = {
    id: number;
    name: string;
};

export type MonedaCuenta = "PEN" | "USD";

export type CuentaUsuario = {
    id: number;
    userId: number;
    tipoCuenta: string;
    entidadId: number;
    numeroCuenta: string;
    moneda: MonedaCuenta;
    alias: string;
    esPropietario: boolean;
    createdAt: string;
    updatedAt: string;
};

export type CreateCuentaUsuarioPayload = {
    userId: number;
    tipoCuenta: string;
    entidadId: number;
    numeroCuenta: string;
    moneda: MonedaCuenta;
    alias: string;
    esPropietario?: boolean;
};