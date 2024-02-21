import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CheckPaymentDto } from 'src/users/dto/check-payment.dto';
import { MakePaymentDto } from 'src/users/dto/make-payment.dto';

@Injectable()
export class PaymentService {
//ЮКАССА
    async makePayment(dto: MakePaymentDto) {
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://api.yookassa.ru/v3/payments',
                headers: {
                    "Content-Type": "application/json",
                    "Idempotence-Key": Date.now()
                },
                auth: {
                    //ЮЗЕРНЕЙМ С ЮКАССЫ И СЕКРЕТНЫЙ КЛЮЧ
                    username: '330913',
                    password: 'test_7yJMXAGv7jdPrkD_WQZ0NqIsxlmLucYq6iuCcjbFLVA'
                },
                data: {
                    amount: {
                        //СТОИМОСТЬ
                        value: dto.amount,
                        currency: "RUB"
                    },
                    capture: true,
                    //РЕДИРЕКТ ПРИ УСПЕШНОЙ ОПЛАТЕ
                    confirmation: {
                        type: "redirect",
                        return_url: "http://localhost:3000/cart"
                      },
                    description: 'Заказ №1'
                }
            })
            return data;
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
    async checkPayment(dto: CheckPaymentDto) {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `https://api.yookassa.ru/v3/payments/${dto.paymentId}`,
                auth: {
                    //ЮЗЕРНЕЙМ С ЮКАССЫ И СЕКРЕТНЫЙ КЛЮЧ
                    username: '330913',
                    password: 'test_7yJMXAGv7jdPrkD_WQZ0NqIsxlmLucYq6iuCcjbFLVA'
                },
              
            })
            return data;
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}
