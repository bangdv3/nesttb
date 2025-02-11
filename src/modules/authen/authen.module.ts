import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";

import { AuthenController } from "./authen.controller";
import { AuthenService } from "./authen.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";



@Module({
    imports: [
        DatabaseModule, 
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'my-secret-key',  
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        })
    ],
    controllers: [AuthenController],
    providers: [AuthenService, JwtStrategy]
})
export class AuthenModule {}