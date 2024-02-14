import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { UsersService } from 'src/users/users.service';
import { GoodsService } from 'src/goods/goods.service';
import { CreateCardItem } from 'src/users/dto/create-cardItem.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private cartRepository: typeof Cart, private userSerivce: UsersService, private goodService: GoodsService) { }

    async findAll(userId) {
        return await this.cartRepository.findAll({ where: { userId } });
    }
    // name: string;
    // brand: string;
    // type: string;
    // price: number;
    // img: string;
    // count: number;
    // total_price: number;
    async addItem(dto: CreateCardItem) {
        const cart = new Cart();
        const user = await this.userSerivce.findOne(dto.userId);
        const good = await this.goodService.findOne(dto.goodId);

        cart.userId = user.id;
        cart.goodId = good.id;
        cart.name = good.name;
        cart.brand = good.name;
        cart.type = good.type;
        cart.price = good.price;
        // cart.img = JSON.parse(good.img)[0];
        cart.img = good.img;
        cart.total_price = good.price;
        return cart.save();
    }

    async updateCount(count, goodId) {
        await this.cartRepository.update({ count }, { where: { goodId } })
        const good = await this.cartRepository.findOne({ where: { goodId } })

        return { count: good.count }
    }

    async updateTotalPrice(total_price, goodId) {
        await this.cartRepository.update({ total_price }, { where: { goodId } })
        const good = await this.cartRepository.findOne({ where: { goodId } })

        return { count: good.total_price }
    }

    async removeCartItem(goodId) {

        const good = await this.cartRepository.findOne({ where: { goodId } })

        await good.destroy();
    }

    async removeAll(userId) {

        await this.cartRepository.destroy({ where: { userId } })
    }

}
