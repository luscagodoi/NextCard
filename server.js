import fastify from "fastify"

import fastifyStatic from "@fastify/static"

import path from "path"

import { fileURLToPath } from "url"

// Necessário para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({ logger: true })

server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

server.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

server.get('/room/:id', async (request, reply) => {
  return reply.sendFile('room.html');
});


server.listen({
    port:"3333",
});