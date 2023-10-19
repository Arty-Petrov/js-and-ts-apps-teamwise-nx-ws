interface RmqConnectionString {
  username: string;
  password: string;
  host: string;
  port: string;
}
export function getRmqConnectionString({ username, password, host, port }: RmqConnectionString): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}
