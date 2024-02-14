import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({message:'Должно быть строкой'})
    @IsEmail({}, { message: 'Требуется ввести адрес электронной почты' })
    email:string;
    @IsString({message:'Должно быть строкой'})
    @Length(4,16,{message:'Не менее 4 и не более 16 символов'})
    password:string;
}
