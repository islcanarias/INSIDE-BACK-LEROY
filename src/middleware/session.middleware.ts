import '@env';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { axiosAgent } from '../utils/axiosAgent'; // ajusta la ruta según tu estructura


export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    const accessToken = cookies.access_cookie;
    const refreshToken = cookies.refresh_cookie;
    const host = req.hostname;
    const path = req.path;

    if (!isHtmlRequest(req)) {
        return next();
    }

    if (path.startsWith('/api-docs') || path.startsWith('/api/v1/api-docs')) {
        return next();
    }

    // 1. Verificar access token
    if (accessToken) {
        try {
            const verifyRes = await axios.post(
                `${process.env.LOGIN_API_URL}/auth/checkAccessToken`,
                {},
                {
                    headers: {
                        Cookie: `access_cookie=${accessToken}`,
                    },
                    withCredentials: true,
                    validateStatus: () => true,
                    httpsAgent: axiosAgent,
                }
            );

            const { ok, reason } = verifyRes.data;

            if (ok) {
                return await checkPermissionAndRedirect(res, next, accessToken, host, path);
            }

            if (reason === 'revoked') {
                clearCookies(res);
                return res.redirect(process.env.LOGIN_URL || '/');
            }
        } catch (e) {
            console.error('[Middleware] Error verificando access token', e);
        }
    }

    // 2. Intentar renovar si hay refresh_token
    if (refreshToken) {
        try {
            const refreshRes = await axios.post(
                `${process.env.LOGIN_API_URL}/auth/renewRefreshToken`,
                {},
                {
                    headers: {
                        Cookie: `refresh_cookie=${refreshToken}`,
                    },
                    withCredentials: true,
                    validateStatus: () => true,
                    httpsAgent: axiosAgent,
                }
            );

            const { ok, reason, access_token, refresh_token } = refreshRes.data;

            if (ok && access_token && refresh_token) {
                res.cookie('access_cookie', access_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                    domain: process.env.SUBDOMAIN,
                    maxAge: 20 * 60 * 1000,
                });

                res.cookie('refresh_cookie', refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                    domain: process.env.SUBDOMAIN,
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                });

                return await checkPermissionAndRedirect(res, next, access_token, host, path);
            }

            if (reason === 'revoked') {
                clearCookies(res);
                console.warn('[Middleware] Refresh token revocado');
                return res.redirect(process.env.LOGIN_URL || '/');
            }
        } catch (e) {
            console.error('[Middleware] Error renovando refresh token:', e);
        }
    }

    // 3. Si todo falla: limpiar y redirigir al login para iniciar sesión
    clearCookies(res);
    if (isLoginPage(host, path)) {
        return next();
    }
    return res.redirect(process.env.LOGIN_URL || '/');
}

function clearCookies(res: Response) {
    res.clearCookie('access_cookie', {
        domain: process.env.SUBDOMAIN,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });

    res.clearCookie('refresh_cookie', {
        domain: process.env.SUBDOMAIN,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
}

async function checkPermissionAndRedirect(
    res: Response,
    next: NextFunction,
    accessToken: string,
    host: string,
    path: string
) {

    const normalizedPath = normalizarRuta(path);
    if (isLoginHomePage(host, normalizedPath)) return next();
    if (isRootPage(normalizedPath)) return res.redirect(`https://${host}/home`);
    try {
        const hasRequestedPathPerms = await havePermissions(accessToken, host, normalizedPath);
        if (hasRequestedPathPerms) return next();

        const hasHomePerms = await havePermissions(accessToken, host, '/home');
        if (hasHomePerms) {
            return res.redirect(`https://${host}/home`);
        } else {
            return res.redirect(process.env.LOGIN_URL + '/home' || '/');
        }
    } catch (e) {
        console.error('[Middleware] Error en checkPermissionAndRedirect', e);
        return res.redirect(process.env.LOGIN_URL + '/home' || '/');
    }
}

async function havePermissions(accessToken: string, host: string, path: string) {
    const ruta = path.replace(/^\/+/, ''); // Por ejemplo, "/home" => "home" o "/admin/dashboard" => "admin/dashboard"
    const subdominio = host.split('.')[0]; // Por ejemplo, "admin.dominio.com" => "admin"
    const userInfoRes = await axios.post(
        `${process.env.LOGIN_API_URL}/permissions/check-pagina`,
        {
            ruta: ruta,
            subdominio: subdominio,
        },
        {
            headers: {
                Cookie: `access_cookie=${accessToken}`,
            },
            withCredentials: true,
            validateStatus: () => true,
            httpsAgent: axiosAgent,
        }
    );
    const { ok } = userInfoRes.data;
    return ok;
}

function normalizarRuta(path: string): string {
    if (path === '/') return '/';
    return path.replace(/\/+$/, ''); // quita barra(s) final(es)
}

function isLoginHomePage(host: string, path: string): boolean {
    return host.startsWith('login.') && path === '/home';
}

function isLoginPage(host: string, path: string): boolean {
    return host.startsWith('login.') && path === '/';
}

function isRootPage(path: string): boolean {
    return path === '/';
}

function isHtmlRequest(req: Request): boolean {
    const accept = req.headers.accept || '';
    return accept.includes('text/html');
}
