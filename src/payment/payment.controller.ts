import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/response.utils';

@Controller('payment')
export class PaymentController {
  // Static payment data for demonstration
  private payments = [
    { id: 1, amount: 1500, currency: 'INR', status: 'paid', payer: 'Alice' },
    { id: 2, amount: 2500, currency: 'INR', status: 'pending', payer: 'Bob' },
    { id: 3, amount: 750, currency: 'INR', status: 'failed', payer: 'Charlie' },
  ];

  // List all payments
  @Get('list')
  getAllPayments() {
    return successResponse(this.payments, 'Payments fetched successfully');
  }

  // View a single payment by ID
  @Get('view/:id')
  getPayment(@Param('id') id: string) {
    const payment = this.payments.find(p => p.id === Number(id));
    if (!payment) return { error: 'Payment not found' };
    return successResponse(payment, 'Payment fetched successfully');;
  }
}
