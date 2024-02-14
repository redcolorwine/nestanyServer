import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GoodCreationAttr {
    name: string;
    type: string;
    brand: string;
    price: number;
    description: string;
    img: string;
}

@Table({ tableName: 'goods' })
export class Goods extends Model<Goods, GoodCreationAttr>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    type: string;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    brand: string;

    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    price: number;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    description: string;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    img: string;
}