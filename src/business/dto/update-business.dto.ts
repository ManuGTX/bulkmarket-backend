import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class ActualizarNegocioDto {
  @IsOptional() @IsString() @IsNotEmpty() razonSocial?: string;
  @IsOptional() @IsString() @IsNotEmpty() nombreComercial?: string;
  @IsOptional() @IsString() @Matches(/^[A-Za-z0-9-]{6,50}$/) identificacionFiscal?: string;
  @IsOptional() @IsString() @IsNotEmpty() telefono?: string;
  @IsOptional() @IsString() @IsNotEmpty() direccion?: string;
}
