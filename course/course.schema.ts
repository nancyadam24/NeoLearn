import { ApiProperty } from "@nestjs/swagger";
const Joi = require('joi');


class CourseDto{
    @ApiProperty({ description: 'The name of the course', example: 'Ανάπτυξη Εφαρμογών', type: String, })
    course_name: string;

    @ApiProperty({ description: 'The id of the course.', example: 'AIC293', type: String, })
    course_id: string;

    @ApiProperty({ description: 'The creation date of the course.', example: '29/11/2002 19:57', type: String, })
    created_at: string;

    @ApiProperty({ description: 'The name of the creator of the course(either professor or admin', example: 'Georgios Chondromatidis', type: String, })
    creator_name: string;

    @ApiProperty({ description: 'The id of the creator of the course(either professor or admin', example: 'Georgios Chondromatidis', type: String, })
    creator_id: string;
}
class CourseQueryDto {
    @ApiProperty({ required: true, description: 'List of all courses', type: [CourseDto] })
    courses: CourseDto

    @ApiProperty({ required: true, description: 'Total number of courses', type: Number })
    total: number;
}

class CourseFileDto{
    @ApiProperty({ required: true, description: 'The database id of the file', example: "142100b5-3657-4c48-b322-4057e4c3bc64", type: String })
    file_id: string;

    @ApiProperty({ required: true, description: 'The original name of the file', example: "Λυσεις Παραλληλου.docx", type: String })
    file_name: string;

    @ApiProperty({ required: true, description: 'The id of the user who uploaded the file', example: "b1110f6d-8caa-48ad-896b-b5b4ef50b0ab", type: String })
    uploader_id: string;

    @ApiProperty({ required: true, description: 'The name of the user who uploaded the file', example: "Georgios Chondromatidis", type: String })
    uploader_name: string;

    @ApiProperty({ required: true, description: 'The upload date of the file', example: "2023-12-26 16:15:51", type: String })
    created_at: string;
}

class CourseFileQueryDto{
    @ApiProperty({ required: true, description: 'List of all files', type: [CourseFileDto] })
    files: [CourseFileDto]

    @ApiProperty({ required: true, description: 'Total number of files', type: Number })
    total: number;
}


class CreateCourseDto{
    @ApiProperty({ required: true, description: 'The name of the new course', example: "Ανάπτυξη Εφαρμογών", type: String })
    name: string;

    @ApiProperty({ required: true, description: 'The id of the new course. LENGTH MUST BE 6 CHARACTERS', example: "AIC291", type: String })
    id: string;
}

class EditCourseDto{
    @ApiProperty({ required: true, description: 'The new name of an existing course', example: "Ανάπτυξη Εφαρμογών", type: String })
    name: string;

    @ApiProperty({ required: true, description: 'The new id of the course', example: "AIC291", type: String })
    id: string;
}

const CreateCourseSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    id: Joi.string().length(6).required()
});
const EditCourseSchema = Joi.object({
    name: Joi.string().min(3).max(255),
    id: Joi.string().length(6)
});
export {CourseQueryDto, CourseDto, CreateCourseDto, CreateCourseSchema, EditCourseSchema, EditCourseDto, CourseFileQueryDto, CourseFileDto}