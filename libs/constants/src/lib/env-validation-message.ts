export const EnvValidationMessage = {
  RmqServiceNameRequired: 'RabbitMQ service name is required',
  RmqExchangeRequired: 'RabbitMQ exchange is required',
  RmqUserRequired: 'RabbitMQ user is required',
  RmqPasswordRequired: 'RabbitMQ password is required',
  RmqHostRequired: 'RabbitMQ host is required',
  RmqPortRequired: 'RabbitMQ port is required',
  DbUrlRequired: 'Database connection string is required'
} as const;
