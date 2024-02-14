import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { Op } from 'sequelize';

@Injectable()
export class GoodsService {

    constructor(@InjectModel(Goods) private goodsRepository: typeof Goods) { }

    async paginateAndFilter(query) {
        const limit = +query.limit;
        const offset = +query.offset * limit;
        return await this.goodsRepository.findAndCountAll({
            limit,
            offset,
        });
    }

    async findOne(goodId) {
        return await this.goodsRepository.findOne({ where: { id: goodId } });
    }

    async findOneByName(name) {
        return await this.goodsRepository.findOne({ where: { name } })
    }

    async searhByString(str) {
        return this.goodsRepository.findAndCountAll({
            limit: 20,
            where: { name: { [Op.like]: `%${str}` } }
        })
    }
    async getAll(){
        return await this.goodsRepository.findAll();
    }
}
