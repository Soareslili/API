import { FastifyInstance } from "fastify"



async function routes(fastify: FastifyInstance): Promise<void>{

    fastify.get('/health', async() => {
        return {
            status: 'Ok',
            message: 'DevBilss API rodando normalmente'
        }
    })
}


export default routes