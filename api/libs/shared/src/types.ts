export type EnvironmentVariables = {
  RABBITMQ_DEFAULT_USER: string;
  RABBITMQ_DEFAULT_PASS: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_HOST: string;

  RABBITMQ_AUTH_QUEUE: string;
  RABBITMQ_PRESENCE_QUEUE: string;

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_URI: string;

  PGADMIN_DEFAULT_EMAIL: string;
  PGADMIN_DEFAULT_PASSWORD: string;
};
