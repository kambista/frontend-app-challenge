import type { TipoDocumento } from "../services/auth/auth.types";

const MIN_PASSWORD_LENGTH = 8;

const isValidEmail = (value: string): boolean => {
    const email = value.trim();

    if (email.length === 0) return false;

    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const isValidNombreCompleto = (value: string): boolean => {
    const nombresCompletos = value.trim();

    if (nombresCompletos.length === 0) return false;

    return /^[\p{L}\s]+$/u.test(nombresCompletos);
}

const isValidNumeroDocumento = (
    tipo: TipoDocumento,
    value: string,
): boolean => {
    const numeroDocumento = value.trim();

    if (numeroDocumento.length === 0) return false;

    switch (tipo) {
        case "dni":
            return /^\d{8}$/.test(numeroDocumento);
        case "cce":
            return /^\d{9}$/.test(numeroDocumento);
        case "pasaporte":
            return /^[A-Za-z0-9]{8,15}$/.test(numeroDocumento);
        default: {
            return false;
        }
    }
}

const isValidCelular = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    return /^\d{9}$/.test(digits);
}

type Ymd = { y: number; m: number; d: number };

function isCalendarDate(ymd: Ymd): boolean {
    const { y, m, d } = ymd;
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;
    const dt = new Date(y, m - 1, d);
    return (
        dt.getFullYear() === y &&
        dt.getMonth() === m - 1 &&
        dt.getDate() === d
    );
}

/** Parsea entrada al estilo registro: ISO parcial o DD/MM/AAAA. */
function parseFechaNacimientoParts(input: string): Ymd | null {
    const t = input.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(t)) {
        const s = t.slice(0, 10);
        const parts = s.split("-");
        if (parts.length !== 3) return null;
        const y = Number(parts[0]);
        const m = Number(parts[1]);
        const d = Number(parts[2]);
        if (![y, m, d].every((n) => Number.isFinite(n))) return null;
        const ymd = { y, m, d };
        return isCalendarDate(ymd) ? ymd : null;
    }
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(t);
    if (match) {
        const d = Number(match[1]);
        const m = Number(match[2]);
        const y = Number(match[3]);
        if (![y, m, d].every((n) => Number.isFinite(n))) return null;
        const ymd = { y, m, d };
        return isCalendarDate(ymd) ? ymd : null;
    }
    return null;
}

function ageInYears(birth: Ymd, ref: Date): number {
    let age = ref.getFullYear() - birth.y;
    const refMonth = ref.getMonth() + 1;
    const refDay = ref.getDate();
    if (
        refMonth < birth.m ||
        (refMonth === birth.m && refDay < birth.d)
    ) {
        age -= 1;
    }
    return age;
}

const isValidFechaNacimientoMayorEdad = (raw: string): boolean => {
    const ymd = parseFechaNacimientoParts(raw);
    if (!ymd) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthDate = new Date(ymd.y, ymd.m - 1, ymd.d);
    if (birthDate.getTime() > today.getTime()) return false;
    return ageInYears(ymd, today) >= 18;
}

/** Muestra fecha de nacimiento como DD/MM/AAAA (ISO parcial o DD/MM/AAAA). */
const formatFechaNacimiento = (raw: string): string => {
    const ymd = parseFechaNacimientoParts(raw);
    if (!ymd) return raw.trim();
    const d = String(ymd.d).padStart(2, "0");
    const m = String(ymd.m).padStart(2, "0");
    return `${d}/${m}/${ymd.y}`;
}


/** Contraseña: mínimo 8 caracteres (longitud del valor tal cual se ingresa). */
const isValidPassword = (value: string): boolean => {
    return value.length >= MIN_PASSWORD_LENGTH;
};

// Cuenta bancaria solo dígitos, al menos uno
const isValidCuentaBancaria = (value: string): boolean => {
    const cuentaBancaria = value.trim();
    if (cuentaBancaria.length === 0) return false;
    return /^\d+$/.test(cuentaBancaria);
}

export default {
    isValidEmail,
    isValidNombreCompleto,
    isValidNumeroDocumento,
    isValidCelular,
    isValidFechaNacimientoMayorEdad,
    formatFechaNacimiento,
    isValidCuentaBancaria,
    isValidPassword,
}
