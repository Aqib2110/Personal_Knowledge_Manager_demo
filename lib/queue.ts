import { Queue } from "bullmq";
import { Redis } from 'ioredis';

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls: {}, 
  maxRetriesPerRequest: null
});

connection.on('connect', () => console.log('Connected to Aiven Valkey!'));
connection.on('error', (err) => console.error('Redis error:', err));
export const queue = new Queue('process_document',{ connection })


