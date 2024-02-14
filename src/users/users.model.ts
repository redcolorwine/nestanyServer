import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'kek123321@mail.ru', description: 'Электронный адрес' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({ example: 'dsad124gdga_423fad', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}