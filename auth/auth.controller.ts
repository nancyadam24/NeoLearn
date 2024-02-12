
import { BadRequestException, Controller, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthBodyDto, AuthBodySchema, LoginResponseDto, RegisterBodyDto, RegisterBodySchema, RegisterResponseDto } from './auth.schema';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//Δημιουργία controller "auth" για ταυτοποιηση χρηστων
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    //POST endpoint για συνδεση, συμβατο με openapi
    @Post('signin')
    @ApiOperation({ summary: 'Authenticate the user with the api' })
    @ApiResponse({ status: 201, description: 'User information', type: LoginResponseDto })
    @ApiResponse({ status: 400, description: 'Wrong post body'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async signIn(
        @Body() data: AuthBodyDto,
    ): Promise<LoginResponseDto> {
        const { error, value } = AuthBodySchema.validate(data);
        if (error) throw new BadRequestException(error.details[0].message.replaceAll('\"', ''));
        return this.authService.signin(data);
    }

    //POST endpoint για εγγραφη, συμβατο με openapi
    @Post('signup')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'Successful registration', type: RegisterResponseDto })
    @ApiResponse({ status: 400, description: 'Wrong post body'})
    @ApiResponse({ status: 409, description: 'Username already exists'})
    async signUp(
        @Body() data: RegisterBodyDto,
    ): Promise<RegisterResponseDto> {
        const { error, value } = RegisterBodySchema.validate(data);
        if (error) throw new BadRequestException(error.details[0].message.replaceAll('\"', ''));
        return this.authService.signup(data);
    }
}
