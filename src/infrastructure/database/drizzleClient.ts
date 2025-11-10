import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import type { AppEnvironment } from '../../config/env';

export const createDrizzleClient = (config: AppEnvironment) => {
  const client = createClient({ url: config.databaseUrl });
  return drizzle({ client });
};

export type DatabaseClient = ReturnType<typeof createDrizzleClient>;

