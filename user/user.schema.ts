import { ApiProperty } from "@nestjs/swagger";
const Joi = require('joi');
enum EUserType {
    Manager = 1,
    Professor,
    Student
}

class UserQueryDto{
    @ApiProperty({ required: false, description: 'User id', example: 'ac72410e-0c77-496e-a443-e4b098f988f1', type: String })
    id: string;
}

class EditUserDto{
    @ApiProperty({ required: false, description: 'Users full name', example: "Georgios Chondromatidis", type: String })
    displayName?: string;

    @ApiProperty({ required: false, description: 'username', example: "simple_username", type: String })
    username?: string;

    @ApiProperty({ required: false, description: 'users password', example: "password_321", type: String })
    password?: string;

    @ApiProperty({ required: false, description: 'User email', example: "ics21081@uom.edu.gr", type: String })
    email?: string;

    @ApiProperty({ required: false, description: 'User role', example: 1, type: Number })
    role?: string;
}
export const EditUserSchema = Joi.object({
    displayName: Joi.string().min(3).max(50),
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(6).max(50),
    email: Joi.string().email(),
    role: Joi.number().integer().min(1).max(3)
})
class UserDto {
    @ApiProperty({ required: false, description: 'User id', example: 'ac72410e-0c77-496e-a443-e4b098f988f1', type: String })
    id: string;

    @ApiProperty({ required: false, description: 'Users full name', example: "Georgios Chondromatidis", type: String })
    displayName: string;

    @ApiProperty({ required: false, description: 'username', example: "simple_username", type: String })
    username: string;

    @ApiProperty({ required: false, description: 'User email', example: "ics21081@uom.edu.gr", type: String })
    email: string;

    @ApiProperty({ required: false, description: 'User role', example: 1, type: Number })
    role: string;
}

class UserQueryResponseDto {
    @ApiProperty({ required: true, description: 'List of users', type: [UserDto] })
    users: UserDto

    @ApiProperty({ required: true, description: 'Total number of users', type: Number })
    total: number;
}

export {EUserType, UserDto, UserQueryResponseDto, UserQueryDto, EditUserDto}