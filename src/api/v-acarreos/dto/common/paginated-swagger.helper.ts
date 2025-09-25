import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PaginatedDto<T>(classRef: Type<T>): Type<any> {
    class PaginatedResponse {
        @ApiProperty({ type: [classRef], description: 'Lista de elementos devueltos en esta página' })
        items: T[];

        @ApiProperty({ example: 100, description: 'Número total de elementos en la base de datos' })
        total: number;

        @ApiProperty({ example: 1, description: 'Número de la página actual (empieza en 1)' })
        page: number;

        @ApiProperty({ example: 10, description: 'Cantidad de elementos por página' })
        pageSize: number;
    }

    Object.defineProperty(PaginatedResponse, 'name', { value: `Paginated${classRef.name}` });

    return PaginatedResponse;
}
