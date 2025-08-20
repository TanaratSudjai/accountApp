import { logger } from '~/utils/logger';

export const useLogger = () => {
  return {
    error: (message: string, error?: any) => logger.error(message, error),
    warn: (message: string, data?: any) => logger.warn(message, data),
    info: (message: string, data?: any) => logger.info(message, data),
    debug: (message: string, data?: any) => logger.debug(message, data)
  };
};