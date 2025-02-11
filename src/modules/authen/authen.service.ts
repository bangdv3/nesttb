import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

import { DatabaseService } from "src/database/database.service";
import { LoginDto } from "./dto/login-user.dto";



@Injectable()
export class AuthenService {
    constructor(
        private readonly dbService: DatabaseService,
        private jwtService: JwtService,  
        // private userService: UsersService
    ) {}

    async login(loginDto: LoginDto){
        const {username, password} = loginDto;

        const user = await this.dbService.users.findUnique({
            where: {username: username}
        })

        if(!user) {
            throw new NotFoundException('user not found')
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new NotFoundException('Invalid Password')
        }
        const token = await this.generateToken(username);
        // console.log(token)
        return {
            success: true, token: token
        }

    }
    async generateToken(username: string) {
        return this.jwtService.sign({ username }); 
    }
}
