import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
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
    await this.leadsRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string) {
    const lead = await this.findOne(id);
    await this.leadsRepository.remove(lead);
    return { message: 'Lead deleted successfully' };
  }
}
