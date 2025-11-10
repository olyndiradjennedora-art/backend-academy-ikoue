import 'dotenv/config';

type AppEnvironment = {
  readonly port: number;
  readonly databaseUrl: string;
  readonly jwtSecret?: string;
};

const parsePort = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Le port applicatif est invalide: ${value}`);
  }
  return parsed;
};

const DEFAULT_DB_URL = 'file:./local.db';

export const loadEnvironment = (): AppEnvironment => {
  const databaseUrl = process.env.DB_FILE_NAME ?? DEFAULT_DB_URL;

  return {
    port: parsePort(process.env.PORT, 3000),
    databaseUrl,
    jwtSecret: process.env.JWT_SECRET,
  };
};

export type { AppEnvironment };

