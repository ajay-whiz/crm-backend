import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from '../entities/lead.entity';
import { CommonModule } from '../common/common.module';
@Module({
  imports: [TypeOrmModule.forFeature([Lead]), CommonModule], // ✅ Register entity here
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
