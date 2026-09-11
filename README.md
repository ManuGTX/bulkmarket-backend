# BulkMarket API

API de BulkMarket para autenticación JWT y administración del negocio asociado a cada cuenta.

## Inicio

1. Crea `.env` y definí `JWT_SECRET`.
2. Iniciá PostgreSQL con `docker compose up -d`.
3. Ejecutá `npm install` y `npm run start:dev`.

La API queda disponible en `http://localhost:3000/api`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/auth/register` | Registra usuario y negocio. Roles: `BUYER`, `SELLER`. |
| POST | `/auth/login` | Inicia sesión y entrega token JWT. |
| GET | `/businesses/me` | Lee el negocio autenticado. |
| PATCH | `/businesses/me` | Actualiza el negocio autenticado. |
| DELETE | `/businesses/me` | Elimina negocio y usuarios asociados. |
