import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../authen/authen.guard";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get() // Get /users
    @UseGuards(JwtAuthGuard)
    async getAllUsers() {
        return this.userService.getAllUsers()
    }
}