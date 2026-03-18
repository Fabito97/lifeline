import dotenv from "dotenv";

const envPath = process.env.ENV_FILE_PATH || process.env.DOTENV_CONFIG_PATH || ".env";
dotenv.config({ path: envPath });

const requiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const toInt = (value: string, fallback: number) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const toBool = (value: string | undefined, fallback: boolean) => {
  if (value == null) return fallback;
  return ["true", "1", "yes", "y"].includes(String(value).toLowerCase());
};

const smtpPort = toInt(process.env.SMTP_PORT, 465);

const appEnv = process.env.APP_ENV || process.env.NODE_ENV || "development";

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  appEnv,
  exposeEmailHtml: toBool(process.env.EXPOSE_EMAIL_HTML, appEnv === "staging"),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  port: toInt(process.env.PORT, 5000),
  jwtSecret: requiredEnv("JWT_SECRET"),
  databaseUrl: requiredEnv("DATABASE_URL"),
  databaseDirectUrl: process.env.DATABASE_DIRECT_URL || null,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "postgres",
    port: toInt(process.env.DB_PORT, 5432),
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: smtpPort,
    user: process.env.SMTP_USER,
    from:
      process.env.SMTP_FROM_EMAIL ||
      process.env.FROM_EMAIL,
    pass: process.env.SMTP_PASS,
    secure: toBool(process.env.SMTP_SECURE, smtpPort === 465),
  },
  mailtrap: {
    apiKey: process.env.MAILTRAP_API_KEY,
    inboxId: process.env.MAILTRAP_INBOX_ID,
    fromEmail: process.env.MAILTRAP_FROM_EMAIL,
    accountId: process.env.MAILTRAP_ACCOUNT_ID,
    useSandbox: toBool(process.env.MAILTRAP_USE_SANDBOX, true),
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || "lifeline/profile-images",
  },
};

export default env;
