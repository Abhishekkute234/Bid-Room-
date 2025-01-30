const logger = {
  error: (...args: unknown[]) => console.error(...args),
  info: (...args: unknown[]) => console.info(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  debug: (...args: unknown[]) => console.debug(...args),
};

export default logger; 