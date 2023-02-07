import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

export const BASE_URL: string =
  process.env.BASE_URL || 'https://the-one-api.dev/v2';

export const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || '';
