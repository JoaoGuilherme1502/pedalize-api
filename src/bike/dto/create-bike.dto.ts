import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateBikeDto {
    @ApiProperty({
        example: 'Caloi Elite',
        description: 'Modelo da bike'
    })
    @IsString()
    @IsNotEmpty()
    model: string

    @ApiProperty({
        example: 'Caloi',
        description: 'Marca da bike'
    })
    @IsString()
    @IsNotEmpty()
    brand: string

    @ApiProperty({
        example: 2026,
        description: 'Ano da bike'
    })
    @IsInt()
    @Min(2014)
    @Max(2026)
    @IsNotEmpty()
    year: number

    @ApiProperty({
        example: 6,
        description: 'Valor hora para locar a bike'
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    hourlyRate: number
}


