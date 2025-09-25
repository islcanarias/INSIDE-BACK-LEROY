import '@env';
import https from 'https';
export const isDev = process.env.IGNORE_SSL === 'true';
export const axiosAgent = isDev
  ? new https.Agent({ rejectUnauthorized: false })
  : undefined;