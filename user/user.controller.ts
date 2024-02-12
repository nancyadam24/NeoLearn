import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {AuthGuard, Role, RoleGuard} from '../auth/auth.guard'
import { Body, Get, Post, UseGuards, Req } from '@nestjs/common';
import { EUserType, EditUserDto, EditUserSchema, UserQueryResponseDto } from './user.schema';
import { AuthService } from 'src/auth/auth.service';
import { GenericErrorDto } from 'src/app.schema';
@UseGuards(RoleGuard)
@UseGuards(AuthGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @Role([EUserType.Manager, EUserType.Professor])
    @Get()
    @ApiOperation({ summary: 'Get all currently registered users' })
    @ApiResponse({ status: 201, description: 'List of all users', type: UserQueryResponseDto })
    async getUsers(
        
    ): Promise<UserQueryResponseDto> {
        return await this.userService.queryUsers();
    }

    @Role([EUserType.Manager, EUserType.Professor])
    @Post(':id/edit')
    @ApiOperation({ summary: 'Edit a users account details' })
    @ApiResponse({ status: 201, description: 'Successful edit', type: Boolean })
    @ApiResponse({ status: 400, description: 'Wrong post body', type: GenericErrorDto})
    @ApiResponse({ status: 403, description: 'You are not allowed to edit users', type: GenericErrorDto})
    @ApiResponse({ status: 409, description: 'Username already exists', type: GenericErrorDto})
    async editUser(
        @Param('id') id: string,
        @Body() data: EditUserDto
    ): Promise<Boolean>{
        const { error, value } = EditUserSchema.validate(data);
        if (error) throw new BadRequestException(error.details[0].message.replaceAll('\"', ''));
        if(data.password) data.password = await this.authService.hashPassword(data.password)
        return await this.userService.editUser(id, data);
    }

    @Role([EUserType.Manager, EUserType.Professor])
    @Delete(':id')
    @ApiOperation({ summary: 'Deletes a user from the database' })
    @ApiResponse({ status: 201, description: 'Successful removal', type: Boolean })
    @ApiResponse({ status: 404, description: 'User was not found', type: GenericErrorDto})
    async deleteUser(
        @Param('id') id: string
    ): Promise<Boolean>{
        return await this.userService.deleteUser(id);
    }
}
