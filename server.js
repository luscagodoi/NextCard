import fastify from "fastify"

const server = fastify()

server.get("/", ()=>{
    return "Hello world!"
})

server.get("/room", ()=>{
    return "Hello room!"
})

server.listen({
    port:"3333",
});