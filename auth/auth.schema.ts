import { ApiProperty } from "@nestjs/swagger";
const Joi = require('joi');

class AuthBodyDto {
    @ApiProperty({ description: 'Username', example: 'simple_username69', type: String, })
    username: string;

    @ApiProperty({ description: 'User password', example: 'password', type: String, })
    password: string;

}

class RegisterBodyDto{

    @ApiProperty({ description: 'The users full name', example: 'Georgios Chondromatidis', type: String, })
    displayName: string;

    @ApiProperty({ description: 'Username', example: 'simple_username69', type: String, })
    username: string;

    @ApiProperty({ description: 'Email', example: 'ics21081@uom.edu.gr', type: String, })
    email: string;

    @ApiProperty({ description: 'User password', example: 'password', type: String, })
    password: string;
}

const RegisterBodySchema = Joi.object({

    displayName: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required()

})

const AuthBodySchema = Joi.object({

    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(6).max(50)

})

class RegisterResponseDto {

    @ApiProperty({ description: 'Was the request successful', example: 'true', type: Boolean, })
    success: boolean;

}
class LoginResponseDto {

    @ApiProperty({ description: 'Was the request successful', example: true, type: Boolean, })
    success: boolean;

    @ApiProperty({ description: 'The users unique jwt token.', example: '', type: String, })
    jwt: string;

    @ApiProperty({ description: 'The users UUID', example: 'ac72410e-0c77-496e-a443-e4b098f988f1', type: String, })
    id: string;

    @ApiProperty({ description: 'The users full name', example: 'Georgios Chondromatidis', type: String, })
    displayName: string;

    @ApiProperty({ description: 'The users email', example: 'ics21081@uom.edu.gr', type: String, })
    email: string;

    @ApiProperty({ description: 'The users role(1 = Manager, 2 = Professor, 3 = Student)', example: 1, type: Number, })
    role: Number;

    @ApiProperty({ description: 'The usersname', example: 'simple_username69', type: String, })
    username: string;

    @ApiProperty({ description: 'The users creation date', example: '4/20/00 12:00', type: String, })
    created_at: string;
    
}
export {AuthBodyDto, RegisterResponseDto, LoginResponseDto, AuthBodySchema, RegisterBodyDto, RegisterBodySchema}