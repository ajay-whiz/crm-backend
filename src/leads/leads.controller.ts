import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards  } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { successResponse } from '../common/response.utils';

@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async getAllLeads() {
    const leads = await this.leadsService.findAll();
    return successResponse(leads, 'Leads fetched successfully');
  }

  @Get(':id')
  async getLead(@Param('id') id: string) {
    const lead = await this.leadsService.findOne(id);
    return successResponse(lead, 'Lead fetched successfully');
  }

  @Post()
  async addLead(@Body() body: any) {
    const lead = await this.leadsService.create(body);
    return successResponse(lead, 'Lead created successfully');
  }

  @Put(':id')
  async editLead(@Param('id') id: string, @Body() body: any) {
    const lead = await this.leadsService.update(id, body);
    return successResponse(lead, 'Lead updated successfully');
  }

  @Delete(':id')
  async removeLead(@Param('id') id: string) {
    const result = await this.leadsService.delete(id);
    return successResponse(result, 'Lead deleted successfully');
  }
}
