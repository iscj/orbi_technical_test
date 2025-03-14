import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    example: "Thanos",
    description: 'Nombre de usuario'
  })
  nombre: string;

  @ApiProperty({ 
    example: 10,
    description: 'Edad del usuario'
  })
  edad: number;

  @ApiProperty({
    example: 'email@domain.com',
    description: 'correo electronico',
  })
  email: string;
}
