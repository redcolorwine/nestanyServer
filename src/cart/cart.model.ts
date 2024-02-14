import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CartItemAttr {
    goodId: number;
    userId: number;
    name: string;
    brand: string;
    type: string;
    price: number;
    img: string;
    count: number;
    total_price: number;
}


@Table({ tableName: 'Cart' })
export class Cart extends Model<Cart, CartItemAttr>{
    @ApiProperty({ example: '1', description: 'Уникальный id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: '2', description: 'Уникальный id товара' })
    @Column({ type: DataType.INTEGER, unique: false })
    goodId: number;
    @ApiProperty({ example: '13', description: 'Уникальный id пользователя' })
    @Column({ type: DataType.INTEGER, unique: false })
    userId: number;
    @ApiProperty({ example: 'Футболка Kek', description: 'Название товара' })
    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    name: string;
    @ApiProperty({example:'Kek', description:'Название бренда'})
    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    brand: string;
    @ApiProperty({example:'Футболка', description:'Тип товара'})
    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    type: string;
    @ApiProperty({example:'1990', description:'Цена товара'})
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    price: number;
    @ApiProperty({example:'imageOne.jpg', description:'Картинка'})
    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    img: string;
    @ApiProperty({example:'1', description:'Количество товара'})
    @Column({ type: DataType.INTEGER, unique: false, defaultValue: 1 })
    count: number;
    @ApiProperty({example:'1990', description:'Общая цена'})
    @Column({ type: DataType.INTEGER, unique: false })
    total_price: number;
}