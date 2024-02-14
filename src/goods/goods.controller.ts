import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('Товары')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) { }

  @ApiOperation({ summary: 'Получение товаров' })
  @Get()
  paginateAndFilter(@Query() query) {
    return this.goodsService.paginateAndFilter(query);
  }

  @Get('find/:id')
  findGoodById(@Param('id') id) {
    return this.goodsService.findOne(id);
  }
  @Get('findall')
  findAll() {
    return this.goodsService.getAll();
  }
  @Post('search')
  search(@Body() search) {
    return this.goodsService.searhByString(search);
  }
  @Post('name')
  findByName(@Body() name) {
    return this.goodsService.findOneByName(name);
  }

}
