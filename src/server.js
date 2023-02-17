import { randomUUID } from "node:crypto"
import http from "node:http"
import { json } from "./middlewares/json.js"

const tasks = []
const server = http.createServer(async (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const { method, url } = req

    await json(req, res)

    console.log(req.body)

    if(method === "POST" && url === "/tasks") {

        const { title, decription } = req.body

        const task = {
            id: randomUUID(),
            title,
            decription,
            created_at: new Date()
        }
        tasks.push(task)

        return res.writeHead(201).end()
    }

    if(method === "GET" && url === "/tasks") {        
        return res.writeHead(200).end(JSON.stringify(tasks))
    }

    return res.end("sdsd")

})

server.listen(5555)