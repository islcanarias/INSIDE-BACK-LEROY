import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { validarTokenDesdeRequest } from './token.helper';
import { Reflector } from '@nestjs/core';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { axiosAgent } from 'src/utils/axiosAgent';

@Injectable()
export class EndpointGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        // 1. Validar token
        const result = await validarTokenDesdeRequest(req);
        if (!result.ok || !result.id_usuario) {
            throw new UnauthorizedException('Token inválido o no presente');
        }

        const id_usuario = result.id_usuario;

        // 2. Extraer info de la ruta
        const metodo = req.method;
        const handler = context.getHandler();
        const controller = context.getClass();
        const routePath = this.reflector.get<string>(PATH_METADATA, handler);
        const controllerPath = this.reflector.get<string>(PATH_METADATA, controller);
        if (!controllerPath || !routePath) {
            throw new ForbiddenException('Ruta no válida');
        }
        const api = controllerPath.toLowerCase();
        const endpoint = `${routePath}`.replace(/\/+/g, '/');
        // 3. Hacer petición a check-permission
        try {
            const { data } = await axios.get(process.env.LOGIN_API_URL + '/permissions/check-endpoint', {
                params: {
                    id_usuario: id_usuario,
                    api: api,
                    ruta: endpoint,
                    metodo: metodo,
                },
                httpsAgent: axiosAgent,
            });
            if (data?.ok) return true;
            // If data.ok is not true, explicitly return false or throw
            return false;
        } catch (err: any) {
            console.error('Error al verificar permisos:', err);
            const msg = 'Error al verificar permisos: ' + err.response?.data?.message ;
            throw new ForbiddenException(msg);
        }
    }
}
