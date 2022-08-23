import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const stream = pretty({
    colorize: true,
});

// Logger
export default pino(
    {
        base: undefined,
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        timestamp: () => `,"time":"${dayjs().format()}"`,
    },
    stream
);
