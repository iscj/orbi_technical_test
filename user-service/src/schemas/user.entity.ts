import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 1, 
    description: 'ID usuario' 
  })
  id: number;

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

  @ApiProperty({
    example: '2025-03-14T05:26:48.624Z',
    description: 'Fecha creación',
    type: Number,
  })
  createdAt: number

  @ApiProperty({
    example: '2025-03-14T05:26:48.624Z',
    description: 'Fecha actualización',
    type: Number,
  })
  updatedAt: number
}