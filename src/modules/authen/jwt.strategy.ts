import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(private readonly dbService: DatabaseService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'jwt_secret',
        });
    }

    async validate(payload: {username: string}) {
        const user = await this.dbService.users.findUnique({
            where:{
                username: payload.username
            }
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
}