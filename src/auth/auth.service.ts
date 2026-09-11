import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Business) private readonly businesses: Repository<Business>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const [emailInUse, taxIdInUse] = await Promise.all([
      this.users.exists({ where: { email: dto.email.toLowerCase() } }),
      this.businesses.exists({ where: { taxId: dto.business.taxId } }),
    ]);
    if (emailInUse) throw new ConflictException('Ya existe una cuenta con ese correo electrónico.');
    if (taxIdInUse) throw new ConflictException('Ya existe un negocio con esa identificación fiscal.');

    const business = await this.businesses.save(this.businesses.create(dto.business));
    const user = await this.users.save(this.users.create({
      email: dto.email.toLowerCase(), passwordHash: await bcrypt.hash(dto.password, 12),
      role: dto.role, businessId: business.id,
    }));
    return this.createSession(user, business);
  }

  async login(dto: LoginDto) {
    const user = await this.users.createQueryBuilder('user')
      .addSelect('user.passwordHash').leftJoinAndSelect('user.business', 'business')
      .where('user.email = :email', { email: dto.email.toLowerCase() }).getOne();
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Correo electrónico o contraseña incorrectos.');
    }
    return this.createSession(user, user.business);
  }

  private createSession(user: User, business: Business) {
    const accessToken = this.jwt.sign({ sub: user.id, businessId: user.businessId, role: user.role });
    return { accessToken, user: { id: user.id, email: user.email, role: user.role }, business };
  }
}
