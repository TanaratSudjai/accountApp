interface LogLevel {
    ERROR: 'error';
    WARN: 'warn';
    INFO: 'info';
    DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
};

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private log(level: keyof LogLevel, message: string, data?: any) {
        if (!this.isDevelopment && level === 'DEBUG') return;

        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level}]`;

        if (data) {
            console[LOG_LEVELS[level]](prefix, message, data);
        } else {
            console[LOG_LEVELS[level]](prefix, message);
        }
    }

    error(message: string, error?: any) {
        this.log('ERROR', message, error);
    }

    warn(message: string, data?: any) {
        this.log('WARN', message, data);
    }

    info(message: string, data?: any) {
        this.log('INFO', message, data);
    }

    debug(message: string, data?: any) {
        this.log('DEBUG', message, data);
    }
}

export const logger = new Logger();