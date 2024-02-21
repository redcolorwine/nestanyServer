import { IsNotEmpty } from "class-validator";

export class CheckPaymentDto{
    @IsNotEmpty()
    readonly paymentId:number;
}