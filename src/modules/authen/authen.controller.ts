import { Body, Controller, Post } from "@nestjs/common";
import { AuthenService } from "./authen.service";
import { LoginDto } from "./dto/login-user.dto";

@Controller()
export class AuthenController {
    constructor(private readonly authenService: AuthenService){}

    @Post('/login')
    async login(@Body() loginDto: LoginDto){
        try {
            const result = this.authenService.login(loginDto)
            return result
        } catch (err){
            return err 
        }

    }
} 