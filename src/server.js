import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./route.js"


const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })
    
    if(route) {
        const routeParams = req.url.match(route.path)
        const { ...params } = routeParams
        req.params = params
        return route.handler(req, res)
    }


    return res.end("Desafio - Fundamentos NodeJS")

})

server.listen(5555)