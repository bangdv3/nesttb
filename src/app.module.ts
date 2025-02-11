import { Module } from '@nestjs/common'; 
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthenModule } from './modules/authen/authen.module';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule, AuthenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
