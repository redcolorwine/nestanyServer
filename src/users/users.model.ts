import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/role/role.model";
import { UserRoles } from "src/role/user-roles.model";

interface UserCreationAttr {
    email: string;
    password: string;
    role:string;
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


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];



}