type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isProduction = process.env.NODE_ENV === 'production';

const formatMessage = (level: LogLevel, message: string, data?: unknown) => {
    return [
        `[${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`,
        data ? data : ''
    ];
};

export const logger = {
    info: (message: string, data?: unknown) => {
        if (isProduction) return;
        console.info(...formatMessage('info', message, data));
    },
    warn: (message: string, data?: unknown) => {
        if (isProduction) return;
        console.warn(...formatMessage('warn', message, data));
    },
    error: (message: string, error?: unknown) => {
        // In production, you might want to send this to Sentry/LogRocket
        console.error(...formatMessage('error', message, error));
    },
    debug: (message: string, data?: unknown) => {
        if (isProduction) return;
        console.debug(...formatMessage('debug', message, data));
    }
};
