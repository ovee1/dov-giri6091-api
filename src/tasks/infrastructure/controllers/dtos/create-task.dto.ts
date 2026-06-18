import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {

    @ApiProperty({
        description: 'Titulo de la tarea',
        example: 'This is a tittle',
        required: true
    })

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title!: string;
    @ApiProperty({
            description: 'Descripcion general de la tarea',
            example: 'This is a description',
            required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    description!: string;

}