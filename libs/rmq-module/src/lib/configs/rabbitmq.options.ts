import { registerAs } from '@nestjs/config';
import { env } from 'node:process';


export const rabbitMqOptions = registerAs('rmq', () => ({
  serviceName: env?.['RMQ_SERVICE_NAME'] ?? '',
  user: env?.['RMQ_USER'] ?? '',
  password: env?.['RMQ_PASSWORD'] ?? '',
  host: env?.['RMQ_HOST'] ?? '',
  port: env?.['RMQ_PORT'] ?? '',
}));
