import { Module } from '@nestjs/common'; 
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthenModule } from './modules/authen/authen.module';
import { LogfModule } from './logformat/logf.module';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule, AuthenModule,
    LogfModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
