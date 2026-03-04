import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'Romeu da Silva',
        description: 'Nome do usuário'
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        example: 'usuario@gmail.com',
        description: 'E-mail do usuário'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'pass1214',
        description: 'Senha para login'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}