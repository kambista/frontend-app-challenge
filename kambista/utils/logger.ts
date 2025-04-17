
const DEBUG = process.env.EXPO_PUBLIC_DEBUG

export class Logger {
  private static formatMessage(prefix: string, ...contents: unknown[]): string {
    if (!DEBUG) return "";

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Cambia a true si prefieres un formato de 12 horas
    };
    const timestamp = new Date()
      .toLocaleString("en-GB", options)
      .replace(/-/g, "/");

    // Procesar todos los argumentos y convertirlos a strings legibles
    const messages = contents.map((content) => {
      if (typeof content === "string") {
        return content;
      } else if (typeof content === "object" && content !== null) {
        return JSON.stringify(content, null, 2); // Convierte objetos a JSON legible
      } else {
        return String(content); // Convierte otros tipos (number, boolean, etc.) a string
      }
    });

    // Combinar todos los mensajes en una sola línea
    const combinedMessage = messages.join(" ");

    return `- ${timestamp} - ${prefix}${combinedMessage}`;
  }

  static log(...contents: unknown[]): void {
    if (!DEBUG) return;
    console.log(this.formatMessage("", ...contents));
  }

  static error(...contents: unknown[]): void {
    if (!DEBUG) return;
    console.error(this.formatMessage("[ERROR] ", ...contents));
  }
}