import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AsanaService } from './asana.service';

@Controller('webhook/asana')
export class AsanaController {
  constructor(private readonly asanaService: AsanaService) {}

  @Post('task')
  @HttpCode(HttpStatus.OK)
  async onTaskWebhook(@Body() data: any) {
    // You receive the full task payload here (from N8N or Asana direct)
    await this.asanaService.handleTaskWebhook(data);
    return { message: 'Task event received' };
  }
}
