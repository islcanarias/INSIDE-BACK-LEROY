require('module-alias/register');
import '@env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    app.use(cookieParser());

    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    defaultSrc: ["'self'"],

                    scriptSrc: [
                        "'self'",
                        "https://maps.googleapis.com", // scripts principales
                        "https://maps.gstatic.com",    // scripts internos
                    ],

                    styleSrc: [
                        "'self'",
                        "'unsafe-inline'",             // necesario para estilos inline de Google
                        "https://fonts.googleapis.com" // si usas fuentes de Google
                    ],

                    imgSrc: [
                        "'self'",
                        "https://maps.gstatic.com",
                        "https://maps.googleapis.com", // imágenes del mapa
                        "data:"                        // iconos del mapa y pines base64
                    ],

                    connectSrc: [
                        "'self'",
                        "https://maps.googleapis.com", // conexiones JS interactivas (gen_204, RPC)
                    ],

                    frameSrc: ["'self'", "https://www.google.com"],
                    childSrc: ["'self'", "https://www.google.com"],

                    objectSrc: ["'none'"],
                    baseUri: ["'self'"],
                    formAction: ["'self'"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"], // si usas fuentes externas
                },
            },
            crossOriginEmbedderPolicy: false,
        })
    );



    app.use((req, res, next) => {
        res.setHeader(
            'Permissions-Policy',
            'geolocation=(), microphone=(), camera=(), fullscreen=(self)'
        );
        next();
    });

    app.use(sessionMiddleware);

    app.enableCors({
        origin: (origin, callback) => {
            const devRegex = /^https:\/\/([a-z0-9-]+\.)?dev\.islcanarias\.com$/;
            const prodRegex = /^https:\/\/([a-z0-9-]+\.)?islcanarias\.com$/;

            if (!origin || devRegex.test(origin) || prodRegex.test(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });

    if (process.env.ENABLE_SWAGGER === 'true') {
        const config = new DocumentBuilder()
            .setTitle('API de Transporte')
            .setDescription('Endpoints para gestión de transporte')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document); // 👈 Accede en `/api-docs`
    }

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Elimina propiedades no definidas en el DTO
            forbidNonWhitelisted: true, // Lanza error si hay propiedades no definidas
            transform: true, // Convierte los datos entrantes al tipo del DTO
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
