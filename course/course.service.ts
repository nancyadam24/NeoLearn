import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CourseDto, CourseFileDto, CourseFileQueryDto, CourseQueryDto, CreateCourseDto, EditCourseDto } from './course.schema';
import { Role } from 'src/auth/auth.guard';
import { EUserType } from 'src/user/user.schema';
import { GenericResponseDto } from 'src/app.schema';
import { join } from 'path';
import * as fs from 'fs';
import { uuid } from 'uuidv4';
const db = require('../../src/db');

@Injectable()
export class CourseService {
    public async queryCourses(): Promise<CourseQueryDto>{
        const results = await db.query("SELECT courses.id as course_id, courses.name as course_name, courses.created_at, users.username as creator_name, users.id as creator_id FROM `courses` INNER JOIN users ON created_by = users.id WHERE 1");
        const total = await db.query("SELECT COUNT(*) as total FROM courses");
        return {total: total[0].total, courses: results};
    }

    public async queryCourse(id: string): Promise<CourseDto>{
        const results = await db.query("SELECT courses.id as course_id, courses.name as course_name, courses.created_at, users.username as creator_name, users.id as creator_id FROM `courses` INNER JOIN users ON created_by = users.id WHERE courses.id = ?", [id])
        if(results == 0) throw new NotFoundException("No course was found with provided id");
        return results[0];
    }

    
    public async createCourse({id, name}: CreateCourseDto, request: any): Promise<GenericResponseDto>{
        try{
            await this.queryCourse(id);
            throw new ConflictException("A course already exists with provided id");
        }catch (e){
            await db.query("INSERT INTO courses (id, name, created_by) VALUES (?,?,?)", [id, name, request.userId])
        }
        return {success: true};
    }

    public async editCourse(id: string, data: EditCourseDto): Promise<GenericResponseDto>{
        for(let key in data){
            const sql = `UPDATE courses SET ${key} = ? WHERE id = ?`;
            await db.query(sql, [data[key], id]);
        }
        return {success: true};
    }

    public async deleteCourse(id: string): Promise<GenericResponseDto> {
        await db.query("DELETE FROM courses WHERE id = ?", [id])
        return {success: true};
    }

    async uploadCourseFile(file: Express.Multer.File, courseId: string, request: any): Promise<GenericResponseDto> {
        // Save the file to the server
        //file.originalname
        const fileId = uuid();
        const fileName = `${fileId}.data`;
        const filePath = join('./uploads', fileName);
        fs.writeFileSync(filePath, file.buffer);
        await db.query("INSERT INTO course_files (id, course_id, file_name, uploaded_by) VALUES (?,?,?,?)", [fileId, courseId, file.originalname, request.userId]);
        return {success: true};
    }

    async queryCourseFiles(courseId: string): Promise<CourseFileQueryDto>{
        const total = await db.query("SELECT COUNT(*) as total FROM course_files WHERE course_id = ?", [courseId]);
        const results = await db.query("SELECT course_files.id AS file_id, file_name, uploaded_by AS uploader_id, users.displayName AS uploader_name, course_files.created_at FROM course_files INNER JOIN users on uploaded_by = users.id WHERE course_files.course_id = ?", [courseId]);
        return {total: total[0].total, files: results};
    }

    async queryFile(fileId: string): Promise<CourseFileDto>{
        const results = await db.query("SELECT course_files.id AS file_id, file_name, uploaded_by AS uploader_id, users.displayName AS uploader_name, course_files.created_at FROM course_files INNER JOIN users on uploaded_by = users.id WHERE course_files.id = ?", [fileId]);
        if(results.length == 0) throw new NotFoundException("No file was found for provided id.")
        return results[0];
    }
    
    async deleteCourseFile(fileId: string): Promise<GenericResponseDto>{
        await db.query("DELETE FROM course_files WHERE id = ?", [fileId]);
        const fileName = `${fileId}.data`;
        const filePath = join('./uploads', fileName);
        fs.unlinkSync(filePath);
        return {success: true};
    }

    async createFileStream(fileId: string): Promise<fs.ReadStream> {
        const fileName = `${fileId}.data`;
        const filePath = join('./uploads', fileName);
        return fs.createReadStream(filePath);
    }
}
