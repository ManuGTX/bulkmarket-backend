import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessService } from './business.service';

@Controller('businesses')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  constructor(private readonly businesses: BusinessService) {}

  @Get('me') findMine(@Request() request: { user: { businessId: string } }) { return this.businesses.findOne(request.user.businessId); }
  @Patch('me') updateMine(@Request() request: { user: { businessId: string } }, @Body() dto: UpdateBusinessDto) { return this.businesses.update(request.user.businessId, dto); }
  @Delete('me') async removeMine(@Request() request: { user: { businessId: string } }) {
    await this.businesses.remove(request.user.businessId);
    return { message: 'Negocio eliminado correctamente.' };
  }
}
