import { getRmqConnectionString } from './get-rmq-connection-string';

describe('getRmqConnectionString', () => {
  it('should work', () => {
    expect(getRmqConnectionString({
      username:'',
      password:'',
      host:'',
      port:''
    })).toEqual('amqp://:@:');
  });
});
