import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCardItem } from 'src/users/dto/create-cardItem.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './cart.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Корзина')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }
  @ApiOperation({ summary: "Получение корзины пользователя по id" })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getAll(@Param('id') userId) {
    return this.cartService.findAll(userId);
  }
  @ApiOperation({ summary: "Добавление элемента корзины" })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addToCart(@Body() dto: CreateCardItem) {
    return this.cartService.addItem(dto);
  }
  @ApiOperation({ summary: "Изменение количество товара в корзине" })
  @UseGuards(JwtAuthGuard)
  @Patch('/count/:id')
  updateCount(@Body() { count }, @Param('id') cartId) {
    return this.cartService.updateCount(count, cartId);
  }
  @ApiOperation({ summary: "Изменение финальной цены корзины" })
  @UseGuards(JwtAuthGuard)
  @Patch('/total-price/:id')
  updateTotalPrice(@Body() { total_price }, @Param('id') cartId) {
    return this.cartService.updateTotalPrice(total_price, cartId);
  }
  @ApiOperation({ summary: "Удаление элемента корзины пользователя" })
  @UseGuards(JwtAuthGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') cartId) {
    return this.cartService.removeCartItem(cartId);
  }
  @ApiOperation({ summary: "Удаление всех элементов корзины пользователя" })
  @UseGuards(JwtAuthGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') userId) {
    return this.cartService.removeAll(userId);
  }
}
