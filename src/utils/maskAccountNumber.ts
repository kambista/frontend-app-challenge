export function maskAccountNumber(numeroCuenta: string): string {
    const digits = numeroCuenta.replace(/\D/g, "");
    if (digits.length <= 4) return numeroCuenta;
    return `******${digits.slice(-4)}`;
}
