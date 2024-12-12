import * as process from "process";

export const DOMAIN = process.env.APP_DOMAIN ?? 'localhost';
export const PROTOCOL = process.env.APP_PROTOCOL ?? 'http';
export const PORT = process.env.APP_PORT ?? 3000;
export const HOST = `${PROTOCOL}://${DOMAIN}:${PORT}`; // mb variant without :port
export const ACCESS_SECRET_KEY = process.env.APP_JWT_ACCESS_SECRET_KEY ?? '';
export const REFRESH_SECRET_KEY = process.env.APP_JWT_REFRESH_SECRET_KEY ?? '';

export const SMTP_HOST = process.env.MAIL_SMTP_HOST;
export const SMTP_PORT = process.env.MAIL_SMTP_PORT;
export const SMTP_USER = process.env.MAIL_SMTP_USER;
export const SMTP_PASSWORD = process.env.MAIL_SMTP_PASSWORD;

export const NODE_ENV = process.env.NODE_ENV;

export const RECAPTCHA_SECRET_KEY = process.env.APP_RECAPTCHA_SECRET_KEY;