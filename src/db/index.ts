import { loadEnvironment } from '../config/env';
import { createDrizzleClient } from '../infrastructure/database/drizzleClient';

const config = loadEnvironment();

const db = createDrizzleClient(config);

export default db;

