import { EnvValidationMessage } from '@service/constants';
import { z } from 'nestjs-zod/z';

const environmentsConfigSchema = z.object({

  RMQ_SERVICE_NAME: z.string({
    required_error: EnvValidationMessage.RmqServiceNameRequired,
  }),

  RMQ_EXCHANGE: z.string({
    required_error: EnvValidationMessage.RmqExchangeRequired,
  }),

  RMQ_USER: z.string({
    required_error: EnvValidationMessage.RmqUserRequired,
  }),

  RMQ_PASSWORD: z.string({
    required_error: EnvValidationMessage.RmqPasswordRequired,
  }),
  RMQ_HOST: z.string({
    required_error: EnvValidationMessage.RmqHostRequired,
  }),

  RMQ_PORT: z.string({
    required_error: EnvValidationMessage.RmqPortRequired,
  }),

  HISTORY_DB_URL: z.string({
    required_error: EnvValidationMessage.DbUrlRequired,
  }),
});

export function validateEnvironments(config: Record<string, unknown>) {
  const validationResult = environmentsConfigSchema.safeParse(config);
  if (!validationResult.success) {
    const {issues} = validationResult.error;
    const errorDescriptions = issues.map((issue) => '\n' + `${issue.path}: ${issue.message}`);
    throw new Error(
      `Environments config isn't valid: ${errorDescriptions.join(', ')}`,
    );
  }
  return validationResult.data;
}
