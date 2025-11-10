import { createApp } from './src/app/server';
import { loadEnvironment } from './src/config/env';

const config = loadEnvironment();
const app = createApp();

app.listen(config.port, () => {
  console.log(`Serveur en écoute sur le port ${config.port}`);
});