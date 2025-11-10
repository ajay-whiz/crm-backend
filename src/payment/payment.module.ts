// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
})
export class PaymentModule {}
