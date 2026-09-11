import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectRepository(Business) private readonly businesses: Repository<Business>) {}

  async findOne(id: string) {
    const business = await this.businesses.findOneBy({ id });
    if (!business) throw new NotFoundException('Negocio no encontrado.');
    return business;
  }

  async update(id: string, dto: UpdateBusinessDto) {
    const business = await this.findOne(id);
    Object.assign(business, dto);
    return this.businesses.save(business);
  }

  async remove(id: string) {
    const business = await this.findOne(id);
    await this.businesses.remove(business);
  }
}
