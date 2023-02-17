import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./route.js"


const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups }

        console.log(req.params)
        return route.handler(req, res)
    }


    return res.end("Desafio - Fundamentos NodeJS")

})

server.listen(5555)