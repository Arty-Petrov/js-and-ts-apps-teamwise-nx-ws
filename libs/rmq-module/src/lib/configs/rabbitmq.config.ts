import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { RmqExchange } from '@service/constants';
import { getRmqConnectionString } from '@service/utils';

export const getRabbitMqConfig = (): AsyncModuleConfig<RabbitMQConfig> => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    name: configService.get<string>('rmq.serviceName'),
    exchanges: Object.values(RmqExchange),
    uri: getRmqConnectionString({
      username: configService.get<string>('rmq.user')?? '',
      password: configService.get<string>('rmq.password')?? '',
      host: configService.get<string>('rmq.host')?? '',
      port: configService.get<string>('rmq.port')?? '',
    }),
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
    prefetchCount: 32,
  }),
});
