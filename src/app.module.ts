import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './boards/configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.production',
      // 아래 line을 추가해서 yml 파일도 load 할 수 있게 해줍니다
      load: [() => ({ ormconfig: require('../config/default.yml') })],
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
