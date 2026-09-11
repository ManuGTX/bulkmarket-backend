import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateBusinessDto {
  @IsOptional() @IsString() @IsNotEmpty() legalName?: string;
  @IsOptional() @IsString() @IsNotEmpty() tradeName?: string;
  @IsOptional() @IsString() @Matches(/^[A-Za-z0-9-]{6,50}$/) taxId?: string;
  @IsOptional() @IsString() @IsNotEmpty() phone?: string;
  @IsOptional() @IsString() @IsNotEmpty() address?: string;
}
