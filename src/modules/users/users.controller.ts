import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../authen/authen.guard";
import { LogfService } from "src/logformat/logf.service";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    private readonly logger = new LogfService(UsersController.name)

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get() // Get /users
    // @UseGuards(JwtAuthGuard)
    async getAllUsers() {
        this.logger.log('api -> users/ Get')
        return this.userService.getAllUsers()
    }
}