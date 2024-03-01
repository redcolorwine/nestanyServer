import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'kek123321@mail.ru', description: 'Электронный адрес' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
    @ApiProperty({ example: 'dsad124gdga_423fad', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users:User[]
}