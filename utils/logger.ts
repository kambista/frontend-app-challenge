import { consoleTransport, logger } from "react-native-logs";

export const log = logger.createLogger({
  transport: consoleTransport,
  severity: "debug",
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright"
    }
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true
});
