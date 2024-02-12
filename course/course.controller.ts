import { BadRequestException, Controller, Delete, ForbiddenException, Param, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {AuthGuard, Role, RoleGuard} from '../auth/auth.guard'
import { Body, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CourseFileQueryDto, CourseQueryDto, CreateCourseDto, CreateCourseSchema, EditCourseDto, EditCourseSchema } from './course.schema';
import { CourseService } from './course.service';
import { GenericErrorDto, GenericResponseDto } from 'src/app.schema';
import { CreateContextOptions } from 'vm';
import { EUserType } from 'src/user/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
const contentDisposition = require('content-disposition');
@UseGuards(RoleGuard)
@UseGuards(AuthGuard)
@ApiTags('Courses')
@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all currently available courses' })
    @ApiResponse({ status: 201, description: 'List of all courses', type: CourseQueryDto })
    async getCourses(
        
    ): Promise<CourseQueryDto> {
        return await this.courseService.queryCourses();
    }

    @Role([EUserType.Manager, EUserType.Professor])
    @Post('create')
    @ApiOperation({ summary: 'Creates a new course' })
    @ApiResponse({ status: 201, description: 'Course sucessfuly created', type: GenericResponseDto })
    @ApiResponse({ status: 409, description: 'Course id is duplicate', type: GenericErrorDto})
    @ApiResponse({ status: 403, description: 'You are not allowed to create courses', type: GenericErrorDto})
    async createCourse(
        @Body() data: CreateCourseDto,
        @Req() request: Request
    ): Promise<GenericResponseDto> {
        const { error, value } = CreateCourseSchema.validate(data);
        if (error) throw new BadRequestException(error.details[0].message.replaceAll('\"', ''));
        return await this.courseService.createCourse(data, request);
    }
    
    
    @Post(':id/edit')
    @ApiOperation({ summary: 'Edit an existing course' })
    @ApiResponse({ status: 201, description: 'Course sucessfuly edited', type: GenericResponseDto })
    @ApiResponse({ status: 403, description: 'You are not allowed to edit courses', type: GenericErrorDto})
    async editCourse(
        @Body() data: EditCourseDto,
        @Param('id') id: string,
        @Req() request: any
    ): Promise<GenericResponseDto> {
        const { error, value } = EditCourseSchema.validate(data);
        if (error) throw new BadRequestException(error.details[0].message.replaceAll('\"', ''));
        const course = await this.courseService.queryCourse(id);
        if(request?.user.role != EUserType.Manager){
            if(course.creator_id!=request.user.id) throw new ForbiddenException("Operation now allowed, you cannot edit courses that are not yours.")
        }
        return await this.courseService.editCourse(id, data);
    }

    @Role([EUserType.Manager, EUserType.Professor])
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a course' })
    @ApiResponse({ status: 201, description: 'Course sucessfuly deleted', type: GenericResponseDto })
    @ApiResponse({ status: 403, description: 'You are not allowed to delete courses', type: GenericErrorDto})
    async deleteCourse(
        @Param('id') id: string,
        @Req() request: any
    ): Promise<GenericResponseDto> {
        const course = await this.courseService.queryCourse(id);
        if(request?.user.role != EUserType.Manager){
            if(course.creator_id!=request.user.id) throw new ForbiddenException("Operation now allowed, you cannot delete courses that are not yours.")
        }
        return await this.courseService.deleteCourse(id);
    }
    @Role([EUserType.Manager, EUserType.Professor])
    @Post(':id/file/upload')
    @ApiOperation({ summary: 'Uploads a file to a specific course repository' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCourseFile(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() request: any
    ): Promise<GenericResponseDto> {
        const course = await this.courseService.queryCourse(id);
        if(request?.user.role != EUserType.Manager){
            if(course.creator_id!=request.user.id) throw new ForbiddenException("Operation now allowed, you cannot upload files to courses that are not yours.")
        }
        return await this.courseService.uploadCourseFile(file, id, request);
    }

    @Get(':id/file')
    @ApiOperation({ summary: 'Get all files uploaded to the specific course' })
    @ApiResponse({ status: 201, description: 'List of course files', type: CourseFileQueryDto })
    async queryCourseFiles(
        @Param('id') id: string
    ): Promise<CourseFileQueryDto> {
        const course = await this.courseService.queryCourse(id);
        return await this.courseService.queryCourseFiles(id);
    }



    @Get('file/:id')
    @ApiOperation({ summary: 'Download the file' })
    async downloadFile(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile>{
        const file = await this.courseService.queryFile(id);
        const file_stream = await this.courseService.createFileStream(file.file_id);
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Transfer-Encoding': 'binary',
            'Content-Disposition': `attachment; filename="${encodeURIComponent(file.file_name)}"`,
          });
        return new StreamableFile(file_stream);
    }

    @Delete('file/:id')
    @ApiOperation({ summary: 'Delete a course file' })
    @ApiResponse({ status: 201, description: 'File sucessfuly deleted', type: GenericResponseDto})
    @ApiResponse({ status: 403, description: 'You are not allowed to delete courses', type: GenericErrorDto})
    async deleteCourseFile(
        @Param('id') id: string,
        @Req() request: any
    ): Promise<GenericResponseDto>{
        const file = await this.courseService.queryFile(id);
        if(request?.user.role != EUserType.Manager){
            if(file.uploader_id!=request.user.id) throw new ForbiddenException("Operation now allowed, you cannot delete files that are not yours.")
        }
        return this.courseService.deleteCourseFile(id);
    }

}
