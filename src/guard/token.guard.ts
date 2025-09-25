import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { validarTokenDesdeRequest } from './token.helper';

@Injectable()
export class TokenGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        const result = await validarTokenDesdeRequest(req);
        if (result.ok) return true;

        throw new UnauthorizedException('Token inválido o no presente');
    }
}
