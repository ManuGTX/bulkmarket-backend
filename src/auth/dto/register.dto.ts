import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength, ValidateNested } from 'class-validator';
import { RolCliente } from '../../users/user.entity';

class RegistroNegocioDto {
  @IsString() @IsNotEmpty() razonSocial: string;
  @IsString() @IsNotEmpty() nombreComercial: string;
  @IsString() @Matches(/^[A-Za-z0-9-]{6,50}$/) identificacionFiscal: string;
  @IsString() @IsNotEmpty() telefono: string;
  @IsString() @IsNotEmpty() direccion: string;
}

export class RegistroDto {
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsEnum(RolCliente) rol: RolCliente;
  @ValidateNested() @Type(() => RegistroNegocioDto) negocio: RegistroNegocioDto;
}
