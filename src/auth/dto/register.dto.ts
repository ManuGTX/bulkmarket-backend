import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength, ValidateNested } from 'class-validator';
import { UserRole } from '../../users/user.entity';

class RegisterBusinessDto {
  @IsString() @IsNotEmpty() legalName: string;
  @IsString() @IsNotEmpty() tradeName: string;
  @IsString() @Matches(/^[A-Za-z0-9-]{6,50}$/) taxId: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() address: string;
}

export class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsEnum(UserRole) role: UserRole;
  @ValidateNested() @Type(() => RegisterBusinessDto) business: RegisterBusinessDto;
}
