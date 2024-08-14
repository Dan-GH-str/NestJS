import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


// Правила проверки для нашего ValidationPipe. Если запрос достигает эндпоинта(конечной строчки) с недопустимым свойствами в теле запроса, приложение автоматически отвечает кодом 400 Bad Request.
export class CreateFlowerDto {
    @IsString()
    @ApiProperty({
        example: 'Blue Flower',
    })
    name: string

    @IsString()
    @ApiProperty({
        example: 'A beautiful blue flower',
    })
    description: string

    @IsNumber()
    @ApiProperty({
        example: '10',
    })
    price: number
}

export type TUpdateFlowerDto = Partial<CreateFlowerDto>