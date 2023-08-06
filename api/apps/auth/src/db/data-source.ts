import { DataSourceOptions } from 'typeorm';
import { UserEntity } from 'apps/auth/src/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  synchronize: false, // should be disabled in prod, may lose data,
  entities: [UserEntity],
};
