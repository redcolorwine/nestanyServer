import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodDto } from 'src/role/dto/add-good.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';



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

  // @Post('add')
  // @UseInterceptors(FileInterceptor('img'))
  // addGood(@Body() dto: AddGoodDto, @UploadedFile() img) {
  //   return this.goodsService.addGoods(dto, img);
  // }

  @Post('add')
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;
        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false);
      }
      cb(null, true);
    },
  }))
  addGood(@Body() dto: AddGoodDto, @UploadedFile() img: Express.Multer.File) {
    return this.goodsService.addGoods(dto, img.filename);
    // console.log(img)
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

}
