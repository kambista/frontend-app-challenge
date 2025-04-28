export const formatFecha = (input: string): string => {
  const digits = input.replace(/\D/g, '').slice(0, 8);
  const parts = [];
  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
    if (digits.length >= 4) {
      parts.push(digits.slice(2, 4));
      parts.push(digits.slice(4));
    } else {
      parts.push(digits.slice(2));
    }
  } else {
    parts.push(digits);
  }
  return parts.join('/');
};

export const validarNombre = (value: string): boolean => {
  const nombre = value.trim();
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre) && nombre.length >= 3;
};

export const validarDocumento = (
  value: string,
  type: 'dni' | 'cce' | 'passport',
): boolean => {
  const raw = value.trim();
  switch (type) {
    case 'dni':
      return /^\d{8}$/.test(raw);
    case 'cce':
      return /^\d{9}$/.test(raw);
    case 'passport':
      return /^[A-Za-z0-9]{8,15}$/.test(raw);
    default:
      return false;
  }
};

export const validarTelefono = (value: string): boolean => {
  return /^9\d{8}$/.test(value.trim());
};

export const validarFechaNacimiento = (value: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = regex.exec(value.trim());
  if (!match) return false;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const fecha = new Date(year, month, day);
  if (
    fecha.getFullYear() !== year ||
    fecha.getMonth() !== month ||
    fecha.getDate() !== day
  ) {
    return false;
  }
  const hoy = new Date();
  let edad = hoy.getFullYear() - year;
  if (
    hoy.getMonth() < month ||
    (hoy.getMonth() === month && hoy.getDate() < day)
  ) {
    edad--;
  }
  return edad >= 18;
};

export const validarEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

export const validarPassword = (value: string): boolean => {
  return value.trim().length >= 6;
};
