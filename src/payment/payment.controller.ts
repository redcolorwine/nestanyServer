import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from 'src/users/dto/make-payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckPaymentDto } from 'src/users/dto/check-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }
  // @UseGuards(JwtAuthGuard)
  @Post()
  makePayment(@Body() dto: MakePaymentDto) {
    return this.paymentService.makePayment(dto);
  }

  @Post('check')
  checkPayment(@Body() dto: CheckPaymentDto) {
    return this.paymentService.checkPayment(dto);
  }

}
