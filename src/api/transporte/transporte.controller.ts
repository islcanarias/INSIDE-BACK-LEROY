import { Controller, Get, Patch, Param, Body, Post, Delete } from '@nestjs/common';
import { TransporteService } from './transporte.service';

function sanitizeBigInt(obj: any): any {
    return JSON.parse(
        JSON.stringify(obj, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    );
}

@Controller('transporte')
export class TransporteController {

    constructor(
        private readonly transporteService: TransporteService,
    ) { }

    @Get('prueba')
    getPrueba() {
        return '¡Prueba exitosa de la API de Transporte!';
    }

    @Get('rutas/operativa/:nombreOperativa')
    async getRutas(@Param('nombreOperativa') nombreOperativa: string) {
        return await this.transporteService.getRutas(nombreOperativa);
    }

    @Get('paradas')
    async getParadas() {
        return await this.transporteService.getParadas();
    }

    @Get('paradas/operativa/:nombreOperativa')
    async getParadasPorOperativa(@Param('nombreOperativa') nombreOperativa: string) {
        return await this.transporteService.getParadasPorOperativa(nombreOperativa);
    }

    @Patch('paradas/posicion/:id')
    async patchParadas(
        @Param('id') id: string,
        @Body('id_ruta') id_ruta: number,
        @Body('orden') orden: number
    ) {
        const result = await this.transporteService.patchParadas(id, id_ruta, orden);

        if (result.affectedRows === 0) {
            return { error: 'Parada no encontrada.' };
        }

        return { message: 'Parada actualizada correctamente.' };
    }

    @Patch('paradas/reordenar')
    async reordenarParadas(@Body() paradas: { id: string; id_ruta: number; orden: number }[]) {
        const result = await this.transporteService.reordenarParadas(paradas);
        return { message: 'Reordenadas correctamente', updated: result };
    }

    @Post('paradas')
    async crearParada(@Body() body: {
        id_ruta: number;
        nombre: string;
        latitud: number;
        longitud: number;
        descripcion: string;
        orden: number;
    }) {
        const result = await this.transporteService.crearParada(body);

        return {
            message: 'Parada creada correctamente.',
            result: sanitizeBigInt(result), // 👈 Aquí
        };
    }

    @Post('rutas')
    async crearRuta(@Body() body: {
        nombre: string;
        operativa: string;
    }) {
        const result = await this.transporteService.crearRuta(body);

        return {
            message: 'Ruta creada correctamente.',
            result: sanitizeBigInt(result), // 👈 Aquí
        };
    }

    @Patch('paradas/:id')
    async actualizarParada(
        @Param('id') id: string,
        @Body() body: {
            nombre?: string;
            latitud?: number;
            longitud?: number;
            descripcion?: string;
        }
    ) {
        const result = await this.transporteService.actualizarParada(id, body);

        if (result.affectedRows === 0) {
            return { error: 'Parada no encontrada.' };
        }

        return { message: 'Parada actualizada correctamente.' };
    }

    @Delete('paradas/:id')
    async eliminarParada(@Param('id') id: string) {
        const result = await this.transporteService.eliminarParada(id);

        if (result.affectedRows === 0) {
            return { error: 'Parada no encontrada o ya eliminada.' };
        }

        return { message: 'Parada eliminada correctamente.' };
    }

    @Delete('rutas/:id')
    async eliminarRuta(@Param('id') id: string) {
        const result = await this.transporteService.eliminarRuta(id);

        if (result.affectedRows === 0) {
            return { error: 'Ruta no encontrada o ya eliminada.' };
        }

        return { message: 'Ruta eliminada correctamente.' };
    }



    @Post('paradas/ordenar-automatico/:id_ruta')
async optimizarYGuardarParadas(@Param('id_ruta') id_ruta: string) {
    const resultado = await this.transporteService.optimizarYGuardarOrdenParadas(+id_ruta);

    return {
        message: 'Orden optimizado y guardado exitosamente.',
        totalActualizadas: resultado.updated,
    };
}

}




