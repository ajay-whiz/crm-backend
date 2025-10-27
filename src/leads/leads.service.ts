import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { MailerService } from '../common/mailer.service';
@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    private mailerService: MailerService,
  ) {}

  async findAll() {
    return this.leadsRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const lead = await this.leadsRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async create(data: Partial<Lead>) {
    const newLead = this.leadsRepository.create(data);
    return this.leadsRepository.save(newLead);
  }

  async update(id: string, data: Partial<Lead>) {
    const original = await this.leadsRepository.findOne({ where: { id } });
    await this.leadsRepository.update(id, data);
    // Detect status change
    if (data.status && data.status === 'request_form') {
      const asanaFormUrl = 'https://form.asana.com/?k=ikju5t7dt0A4ZpnuHhd0xQ&d=1198912265899203'; // replace with real Asana form
      await this.mailerService.sendAsanaFormEmail(original?.email || "", asanaFormUrl);
    }
    return this.findOne(id);
  }

  async delete(id: string) {
    const lead = await this.findOne(id);
    await this.leadsRepository.remove(lead);
    return { message: 'Lead deleted successfully' };
  }
}
