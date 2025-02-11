import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from "src/database/database.service";
import { Users } from "./users.model";

@Injectable()
export class UsersService {
    constructor(private readonly  dbService: DatabaseService ){}

    async create(createUserDto: Users) {
        const existedUsername = await this.dbService.users.findUnique({
            where: {
                username: createUserDto.username
            }
        })
        if(existedUsername) {
            throw new ConflictException('username already existed')
        }
        const existedEmail = await this.dbService.users.findUnique({
            where: {
                email: createUserDto.email
            }
        })
        if(existedEmail) {
            throw new ConflictException('email already existed')
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.dbService.users.create({
          data: {...createUserDto, password: hashedPassword}
        });
    }
    async getAllUsers(){
        return this.dbService.users.findMany()
    }
    async findOne(username: string) {
        return this.dbService.users.findUnique({
            where: {username}
        });
    }
}
