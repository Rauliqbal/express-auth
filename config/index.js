import * as dotenv from 'dotenv';

dotenv.config();

const { URI, PORT, ACCESS_TOKEN } = process.env;

export { URI, PORT, ACCESS_TOKEN };
