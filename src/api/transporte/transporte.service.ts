import '@env';
import { Injectable } from '@nestjs/common';
import { TransporteRepository } from './transporte.repository';
import axios from 'axios';

@Injectable()
export class TransporteService {

    constructor(
        private readonly transporteRepository: TransporteRepository,
    ) { }

    // Aquí puedes implementar la lógica de negocio relacionada con el transporte
    // Por ejemplo, métodos para obtener rutas, paradas, etc.
    async getPrueba() {
        return '¡Prueba exitosa de la API de Transporte!';
    }

    async getRutas(nombreOperativa: string) {
        return await this.transporteRepository.getRutas(nombreOperativa);
    }

    async getParadas() {
        return await this.transporteRepository.getParadas();
    }

    async getParadasPorOperativa(nombreOperativa: string) {
        return await this.transporteRepository.getParadasPorOperativa(nombreOperativa);
    }

    async patchParadas(paradaId: string, id_ruta: number, orden: number) {
        return await this.transporteRepository.patchParadas(paradaId, id_ruta, orden);
    }

    async reordenarParadas(paradas: { id: string; id_ruta: number; orden: number }[]) {
        return await this.transporteRepository.reordenarParadas(paradas);
    }

    async crearParada(parada: {
        id_ruta: number;
        nombre: string;
        latitud: number;
        longitud: number;
        descripcion: string;
        orden: number;
    }) {
        return await this.transporteRepository.insertParada(parada);
    }


    async crearRuta(ruta: {
        nombre: string;
        operativa: string;
    }) {
        return await this.transporteRepository.insertRuta(ruta);
    }

    async actualizarParada(
        id: string,
        updates: {
            nombre?: string;
            latitud?: number;
            longitud?: number;
            descripcion?: string;
        }
    ) {
        return await this.transporteRepository.actualizarParada(id, updates);
    }

    async eliminarParada(id: string) {
        return await this.transporteRepository.eliminarParada(id);
    }

    async eliminarRuta(id: string) {
        return await this.transporteRepository.eliminarRuta(id);
    }


    async optimizarYGuardarOrdenParadas(id_ruta: number): Promise<any> {
        const paradas = await this.transporteRepository.getParadasByRuta(id_ruta);

        if (!paradas || paradas.length <= 2) {
            return {
                updated: 0,
                message: 'No hay suficientes paradas para optimizar. Se requieren al menos 3.',
            };
        }

        // 👉 separa inicio y fin
        const inicio = paradas[0];
        const fin = paradas[paradas.length - 1];
        const intermedias = paradas.slice(1, -1);

        const apiKey=process.env.GOOGLE_MAPS_API_KEY; // Asegúrate de definirlo en .env

        const waypointsParam = intermedias
            .map(p => `${p.latitud},${p.longitud}`)
            .join('|');

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${inicio.latitud},${inicio.longitud}&destination=${fin.latitud},${fin.longitud}&waypoints=optimize:true|${waypointsParam}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 'OK') {
            console.error('Error en la API de Google:', data.status, data.error_message);
            throw new Error('No se pudo optimizar la ruta');
        }

        const ordenGoogle = data.routes[0].waypoint_order;

        // reconstruir orden optimizado: inicio + intermedias ordenadas + fin
        const ordenadas = [
            inicio,
            ...ordenGoogle.map(i => intermedias[i]),
            fin,
        ];

        console.log('🟢 Orden optimizado por Google:', ordenadas.map((p, i) => ({
            id: p.id,
            nombre: p.nombre,
            orden: i,
        })));

        // generar payload para actualizar DB
        const paradasParaActualizar = ordenadas.map((p, i) => ({
            id: p.id,
            orden: i,
        }));

        const resultado = await this.transporteRepository.guardarOrdenOptimizado(paradasParaActualizar);

        return {
            updated: resultado.updated,
            message: 'Orden optimizado usando Google Directions API.',
            paradas: ordenadas.map((p, i) => ({
                id: p.id,
                nombre: p.nombre,
                orden: i,
                latitud: p.latitud,
                longitud: p.longitud,
                id_ruta: id_ruta,
            })),
        };
    }





}
