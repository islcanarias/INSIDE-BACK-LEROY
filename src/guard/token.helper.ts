import { Request } from 'express';
import axios from 'axios';
import { axiosAgent } from '../utils/axiosAgent'; // ajusta la ruta según tu estructura

export interface TokenValidationResult {
    ok: boolean;
    id_usuario?: number;
}

export async function validarTokenDesdeRequest(req: Request): Promise<TokenValidationResult> {
    try {
        // 1. Validar como JWT de cookie
        const accessToken = req.cookies?.access_cookie;
        if (accessToken) {
            const { data } = await axios.post(process.env.LOGIN_API_URL + '/auth/checkAccessToken',
                {},
                {
                    headers: {
                        Cookie: `access_cookie=${accessToken}`,
                    },
                    withCredentials: true,
                    httpsAgent: axiosAgent,
                });
            if (data?.ok && data?.id_usuario) return { ok: true, id_usuario: data.id_usuario };
        }

        // 2. Validar como JWT bearer
        const bearerToken = req.headers.authorization?.split(' ')[1];
        if (bearerToken) {
            const { data } = await axios.post(process.env.LOGIN_API_URL + '/auth/checkApiToken',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    },
                    httpsAgent: axiosAgent,
                });
            if (data?.ok && data?.id_usuario) return { ok: true, id_usuario: data.id_usuario };
        }

        return { ok: false };
    } catch (err) {
        return { ok: false };
    }
}
