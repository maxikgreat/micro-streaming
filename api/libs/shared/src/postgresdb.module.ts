import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'apps/auth/src/user.entity';
import { SharedModule } from '@app/shared';
import { EnvironmentVariables } from '@app/shared/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        url: configService.getOrThrow('POSTGRES_URI'),
        synchronize: true, // should be disabled in prod, may lose data,
        entities: [UserEntity],
      }),
    }),
  ],
})
export class PostgresDBModule {}
