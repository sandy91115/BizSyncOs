import { copyFile, mkdir } from 'node:fs/promises';

const destination = new URL('../../backend/public/auth-ui/images/', import.meta.url);
await mkdir(destination, { recursive: true });
for (const name of ['bizsync-logo-white.png', 'bizsync-icon.png']) {
  await copyFile(new URL(`../public/images/${name}`, import.meta.url), new URL(name, destination));
}
