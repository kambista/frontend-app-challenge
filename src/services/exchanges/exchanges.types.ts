export type ExchangeType = "compra" | "venta";

export type Exchange = {
    ask: number;
    bid: number;
};

/** Query params for GET /exchange/calculate (forwarded to Kambista calculates). */
export type ExchangeCalculateParams = {
    originCurrency: string;
    destinationCurrency: string;
    amount: string;
    active?: string;
};

/** Raw JSON from Kambista calculates; common fields are optional for typing. */
export type KambistaCalculateData = {
    rate?: number;
    exchange?: number;
    tc?: { bid?: number; ask?: number };
    data?: Record<string, unknown>;
    savings?: Record<string, unknown>;
} & Record<string, unknown>;

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