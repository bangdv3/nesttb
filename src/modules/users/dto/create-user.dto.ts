import {IsEmail, IsString, Length} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(5,20)
    username: string;

    @IsString()
    @Length(5,20)
    password: string;
    
    @IsString()
    @Length(5,20)
    name: string;

    @IsEmail()
    // @Length(5,20)
    email: string;
}